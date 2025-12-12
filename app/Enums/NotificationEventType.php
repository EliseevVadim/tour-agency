<?php

namespace App\Enums;

class NotificationEventType
{
    public const PAYMENT_SUCCEEDED = 'payment.succeeded';
    public const PAYMENT_CANCELED = 'payment.canceled';
    public const PAYMENT_WAITING_FOR_CAPTURE = 'payment.waiting_for_capture';
}
