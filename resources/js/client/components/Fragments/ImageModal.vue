<template>
    <transition name="modal-fade">
        <div class="image-modal-overlay" v-if="isVisible" @click="closeModal">
            <div class="image-modal-content" @click.stop>
                <button class="image-modal-close" @click="closeModal">&times;</button>
                <img :src="imageUrl" alt="Full size image" class="image-modal-full">
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ImageModal",
    props: {
        imageUrl: {
            type: String,
            default: ''
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        }
    },
    watch: {
        isVisible(newVal) {
            if (newVal) {
                document.body.style.overflow = 'hidden';
                window.addEventListener('keydown', this.handleKeydown);
            } else {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', this.handleKeydown);
            }
        }
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
        document.body.style.overflow = '';
    }
}
</script>

<style scoped>
/* Стили для модального окна */
.image-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    z-index: 1000;
}

.image-modal-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.image-modal-full {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.image-modal-close {
    position: absolute;
    top: 0;
    right: 10px;
    color: #fff;
    font-size: 40px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}

.modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
}
</style>
