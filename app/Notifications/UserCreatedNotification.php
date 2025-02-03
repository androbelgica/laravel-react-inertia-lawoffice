<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UserCreatedNotification extends Notification
{
    protected $password;

    public function __construct($password)
    {
        $this->password = $password;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Account Has Been Created')
            ->line('Your account has been created successfully.')
            ->line('Your password is: ' . $this->password)
            ->action('Login', url('/login'))
            ->line('Thank you for using our application!');
    }
}
