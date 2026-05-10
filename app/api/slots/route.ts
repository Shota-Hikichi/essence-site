import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const SLOTS_KEY = 'essence:slots';
const defaultSlots: Record<string, number> = {
  minimum: 1,
  standard: 0,
  fullcommit: 0,
};

function getRedis() {
  return new Redis(process.env.REDIS_URL!);
}

async function getSlots(): Promise<Record<string, number>> {
  const redis = getRedis();
  try {
    const data = await redis.get(SLOTS_KEY);
    if (data) return JSON.parse(data);
    // Initialize with defaults
    await redis.set(SLOTS_KEY, JSON.stringify(defaultSlots));
    return { ...defaultSlots };
  } finally {
    redis.disconnect();
  }
}

// GET: Read current slots
export async function GET() {
  try {
    const slots = await getSlots();
    return NextResponse.json(slots);
  } catch (err) {
    console.error('Slots GET error:', err);
    return NextResponse.json(defaultSlots);
  }
}

// POST: Update slots (admin only)
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const adminKey = process.env.ADMIN_SECRET_KEY || 'essence-admin-2024';

  if (authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const redis = getRedis();
  try {
    const body = await req.json();
    const current = await getSlots();

    for (const [key, value] of Object.entries(body)) {
      if (key in current && typeof value === 'number') {
        current[key] = value;
      }
    }

    await redis.set(SLOTS_KEY, JSON.stringify(current));
    return NextResponse.json(current);
  } catch (err) {
    console.error('Slots POST error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  } finally {
    redis.disconnect();
  }
}
