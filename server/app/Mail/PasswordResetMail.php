<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $token;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $resetLink = url('/reset-password?email=' . urlencode($this->user->email) . '&token=' . urlencode($this->token));

        $html = "
        <!DOCTYPE html>
        <html>
        <head>
            <title>Password Reset</title>
        </head>
        <body>
            <p>Hello {$this->user->name},</p>
            <p>You requested to reset your password. Click the link below to do so:</p>
            <p><a href=\"{$resetLink}\">Reset Password</a></p>
            <p>This link will expire in 60 minutes.</p>
            <p>If you didn’t request a password reset, ignore this email.</p>
        </body>
        </html>
        ";

        return $this->subject('Password Reset Request')
                    ->html($html);
    }
}
