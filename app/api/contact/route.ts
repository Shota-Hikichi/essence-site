import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, phone } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    // Notify admin
    await resend.emails.send({
      from: 'Essence <onboarding@resend.dev>',
      to: 'frisk0709@gmail.com',
      subject: `【お問い合わせ】${name}様より`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2D2D3A;">新しいお問い合わせ</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6B7280; width: 100px;">お名前</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;">メール</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6B7280;">電話番号</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #6B7280;">受信日時</td><td style="padding: 8px 0;">${timestamp}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #F8F9FA; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 16px; font-size: 13px; color: #9CA3AF;">このメールに返信すると ${email} に送信されます。</p>
        </div>
      `,
      replyTo: email,
    });

    // Auto-reply to user
    await resend.emails.send({
      from: 'Essence <onboarding@resend.dev>',
      to: email,
      subject: '【Essence】お問い合わせを受け付けました',
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; color: #2D2D3A; margin-bottom: 24px;">お問い合わせありがとうございます</h1>
          <p style="font-size: 16px; color: #6B7280; line-height: 1.8;">
            ${name}様<br><br>
            お問い合わせを受け付けました。<br>
            内容を確認のうえ、24時間以内にご返信いたします。<br><br>
            しばらくお待ちください。
          </p>
          <p style="font-size: 14px; color: #9CA3AF; margin-top: 32px; line-height: 1.8;">
            Essence コーチングチーム
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Contact error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
