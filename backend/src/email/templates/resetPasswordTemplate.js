export const resetPasswordTemplate = (resetLink) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
    <h2 style="color: #4F46E5;">Notezy Password Reset</h2>
    <p>Hello,</p>
    <p>You recently requested to reset your password. Click the button below to proceed:</p>
    <a href="${resetLink}" target="_blank" 
      style="display: inline-block; padding: 12px 20px; margin: 16px 0; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px;">
      Reset Password
    </a>
    <p>This link is valid for 15 minutes. If you didn’t request this, just ignore this email.</p>
    <p>Thanks,<br/>The Notezy Team</p>
  </div>
`;
