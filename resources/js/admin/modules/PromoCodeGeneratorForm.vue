<template>
  <div class="card shadow">
    <div class="card-body">
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="package_id" class="form-label fw-bold">Применить к Пакету (Тарифу)</label>
          <select v-model="form.package_id"
                  id="package_id"
                  class="form-select"
                  :class="{'is-invalid': errors.package_id}">
            <option value="">Выберите пакет...</option>
            <option v-for="pkg in packages" v-if="pkg.id !== 'maxi'" :key="pkg.id" :value="pkg.id">
              {{ pkg.name }}
            </option>
          </select>
          <div v-if="errors.package_id" class="invalid-feedback">{{ errors.package_id[0] }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Тип Скидки</label>
          <div class="d-flex gap-4 border p-2 rounded bg-light">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="discount_type" id="type_percent" value="percent"
                     v-model="form.discount_type" :class="{'is-invalid': errors.discount_type}">
              <label class="form-check-label" for="type_percent">Процент (%)</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="discount_type" id="type_fixed" value="fixed"
                     v-model="form.discount_type" :class="{'is-invalid': errors.discount_type}">
              <label class="form-check-label" for="type_fixed">Фиксированная сумма (Рубли)</label>
            </div>
          </div>
          <div v-if="errors.discount_type" class="invalid-feedback d-block">{{ errors.discount_type[0] }}</div>
        </div>

        <div class="mb-3">
          <label for="discount_value" class="form-label fw-bold">Значение Скидки</label>
          <input type="number"
                 v-model.number="form.discount_value"
                 id="discount_value"
                 class="form-control"
                 :class="{'is-invalid': errors.discount_value}"
                 min="1"
                 :max="form.discount_type === 'percent' ? 100 : 999999"
                 required>
          <div class="form-text">
        <span v-if="form.discount_type === 'percent'">
            Введите значение скидки от 1% до 100%.
        </span>
            <span v-else>
            Введите сумму скидки в рублях (например, 500).
        </span>
          </div>
          <div v-if="errors.discount_value" class="invalid-feedback">{{ errors.discount_value[0] }}</div>
        </div>

        <div class="mb-3">
          <label for="valid_days" class="form-label fw-bold">Срок действия (Дни с момента генерации)</label>
          <input type="number"
                 v-model.number="form.valid_days"
                 id="valid_days"
                 class="form-control"
                 :class="{'is-invalid': errors.valid_days}"
                 min="1"
                 max="1095"
                 required>
          <div class="form-text">
            Максимум 1095 дней (3 года).
          </div>
          <div v-if="errors.valid_days" class="invalid-feedback">{{ errors.valid_days[0] }}</div>
        </div>

        <div class="mb-4">
          <label for="quantity_to_generate" class="form-label fw-bold">Количество промокодов для генерации</label>
          <input type="number"
                 v-model.number="form.quantity_to_generate"
                 id="quantity_to_generate"
                 class="form-control"
                 :class="{'is-invalid': errors.quantity_to_generate}"
                 min="1" max="10000"
                 required>
          <div v-if="errors.quantity_to_generate" class="invalid-feedback">{{ errors.quantity_to_generate[0] }}</div>
        </div>

        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-success btn-lg" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                  aria-hidden="true"></span>
            {{ isLoading ? 'Создание и Генерация...' : 'Сгенерировать Коды' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    initialPackages: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      packages: this.initialPackages,
      form: {
        package_id: '',
        discount_type: 'percent',
        discount_value: 20,
        valid_days: 10,
        quantity_to_generate: 10,
      },
      errors: {},
      isLoading: false,
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      this.errors = {};
      this.successMessage = '';
      this.errorMessage = '';

      try {
        const response = await axios.post('/admin/api/promo-rules', this.form);
        this.successMessage = response.data.message;
        this.form.discount_type = 'percent';
        this.form.discount_value = 20;
        this.form.valid_days = 365;
        this.form.quantity_to_generate = 100;

        this.$emit('success');

      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
          } else {
            this.errorMessage = error.response.data.message || 'Ошибка сервера при сохранении правила.';
          }
        } else {
          this.errorMessage = 'Ошибка соединения или неизвестная ошибка.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.card-header.bg-primary {
  background-color: #0d6efd !important;
}

.invalid-feedback {
  display: block;
}
</style>
