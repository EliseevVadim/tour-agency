<template>
    <div v-if="isVisible" class="modal fade show d-block modal-payment"
         tabindex="-1" role="dialog" aria-modal="true" @click.self="$emit('close')">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content payment-result-modal">
                <div class="modal-header border-0 pb-0">
                    <button type="button" class="close close-button" @click="$emit('close')" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body pt-0 text-center">
                    <h3 class="fw-bold mb-4 text-uppercase">
                        {{ success ? 'Спасибо за покупку!' : 'Оплата не завершена' }}
                    </h3>

                    <p class="payment-result-text mb-4">
                        {{
                            success
                                ? 'Заказ успешно оплачен. Отправка заказов осуществляется еженедельно в понедельник и четверг. По дополнительным вопросам обращайтесь в службу поддержки.'
                                : 'Мы не получили подтверждение успешной оплаты. Попробуйте снова, и при необходимости обратитесь в службу поддержки.'
                        }}
                    </p>

                    <a href="https://t.me/putclub_info" target="_blank" rel="noopener noreferrer"
                       class="btn w-100 payment-result-btn align-content-center" :class="success ? 'btn-danger' : 'btn-outline-danger'">
                        {{ success ? 'Перейти в чат со службой поддержки' : 'Связаться со службой поддержки' }}
                    </a>
                </div>
            </div>
        </div>

        <div class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
export default {
    name: 'PaymentResultModal',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        success: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isVisible(value) {
            document.body.classList.toggle('modal-open', value);
        }
    },
    beforeDestroy() {
        document.body.classList.remove('modal-open');
    }
};
</script>

<style scoped>
.modal-payment .modal-dialog {
    z-index: 9999;
}

.payment-result-modal {
    border: none;
    border-radius: 0;
    padding: 8px 8px 20px;
}

.close-button {
    font-size: 36px;
    color: #8f8f8f;
    opacity: 1;
    text-shadow: none;
    outline: none;
    box-shadow: none;
}

.payment-result-text {
    font-size: 18px;
    line-height: 1.6;
    color: #111;
}

.payment-result-btn {
    min-height: 58px;
    font-size: 18px;
}

@media (max-width: 767px) {
    .payment-result-text {
        font-size: 16px;
    }

    .payment-result-btn {
        min-height: 52px;
        font-size: 16px;
    }
}
</style>
