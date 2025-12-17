<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PurchaseConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Имя пользователя.
     * @var string
     */
    public $userName;

    /**
     * Название курса.
     * @var string
     */
    public $courseName;

    /**
     * Ссылка для перехода.
     * @var string
     */
    public $link;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($courseName, $userName, $link)
    {
        $this->courseName = $courseName;
        $this->userName = $userName;
        $this->link = $link;
    }

    public function build()
    {
        return $this->subject("Поздравляем с приобретением курса «Путь в туризм»")->view('emails.purchase_success', [
            'courseName' => $this->courseName,
            'userName' => $this->userName,
            'link' => $this->link
        ]);
    }
}
