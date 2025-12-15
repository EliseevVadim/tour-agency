<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PurchaseConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $courseName;
    public $userName;
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

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.purchase_success');
    }
}
