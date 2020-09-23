<template>
  <form class="form" @submit.prevent="submit">
      <div class="form__header">
        <h1>Оформление страховки</h1>
        <p>Данные должны соответствовать паспорту. В ином случае страховка будет недействителена.</p>
      </div>
      <div class="form__group" style="margin-top: 73px">
        <div class="form__group__header">
          <h2>Страхуемые</h2>
        </div>
        <div
          class="form__group__block insure-item"
          v-for="(v, index) in $v.form.subjects.$each.$iter"
          :key="'subjects ' + index"
          >
          <div class="form__num-btn">
            <span class="number">
              {{ Number(index) + 1 }}
            </span>
            <div class="del-btn">
            <span
              class="btn--icon"
              @click="delSubject(index)"
            >
              ✕
            </span>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-8 form__group__item">
              <TextField
                label="Фамилия Имя Отчество"
                descr="Например: Иванов Иван Иванович"
                v-model.trim="v.fio.$model"
                :error="v.fio.$error"
                :errors=checkName(v.fio.required,v.fio.сyrillicс,v.fio.totWord)>
              </TextField>
            </div>
            <div class="col-12 col-md-4 form__group__item">
              <TextField label="Дата рождения"
              v-mask="dateMask"
              :error="v.birthDate.$error"
              v-model="v.birthDate.$model"
              :errors=checkBDay(v.birthDate.required,v.birthDate.checkOld,v.birthDate.minLength)>
              </TextField></div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4 form__group__item">
              <Select label="Документ удостовиряющий личность"
                :options="options"
                clabelMS="title"
                :error="v.regDocType.$error"
                v-model="v.regDocType.$model"
                labelMS="title">
              </Select></div>
            <div class="col-12 col-md-4 form__group__item">
              <TextField label="Серия и номер"
              v-mask="serNumMask"
              :error="v.regDocSerNum.$error"
              :errors=checkDocSerNum(v.regDocSerNum.required,v.regDocSerNum.minLength)
              v-model="v.regDocSerNum.$model">
              </TextField></div>
            <div class="col-12 col-md-4 form__group__item">
              <TextField label="Дата выдачи"
              v-mask="dateMask"
              :error="v.regDocIssuedAt.$error"
              :errors=checkIssuedAt(v.regDocIssuedAt.required,v.regDocIssuedAt.checkDoc,v.regDocIssuedAt.minLength)
              v-model="v.regDocIssuedAt.$model">
              </TextField></div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 form__group__item">
              <TextField label="Кем выдан"
              v-touppercase
              :error="v.regDocIssuedBy.$error"
              :errors=chackIssuedBt(v.regDocIssuedAt.required)
              v-model="v.regDocIssuedBy.$model">
              </TextField></div>
          </div>
        </div>
        <div class="form__group__actions">
          <Btn
            outlined
            @click="addSubject"
            :disabled="form.subjects.length === 5">
            Добавить застрахованного
          </Btn>
        </div>
      </div>
      <div class="form__group" style="margin-top: 65px;">
        <div class="form__group__header">
          <h3>Дата начала действия полиса</h3>
        </div>
        <div class="form__group__block">
          <div class="row">
            <div class="col-12 col-md-4 form__group__item">
              <TextField label="Дата начала действия"
              v-mask="dateMask"
              :error="$v.form.activeFrom.$error"
              v-model="$v.form.activeFrom.$model">
              {{ new Date().getTime() }}
              </TextField></div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn"><span class="btn__content">Отправить</span></button>
    </form>
</template>

<script>
import helper from '@/assets/helper'
import { validationMixin } from 'vuelidate';
import {mask} from 'vue-the-mask';
import { required, minLength, maxLength, between, sameAs, integer } from 'vuelidate/lib/validators';
import { helpers } from 'vuelidate/lib/validators';

const сyrillicс = helpers.regex('alpha', /[а-яА-ЯёЁ]/);
const totWord = (value) => {
  let total = value.split(/\s/).length;
  return total > 1 && total <= 3;
}
const checkOld = (param) => (value) => !helpers.req(value) || helper.getCurrentAge(value) >= param;
const checkDoc = (value, vm) => {
  const howOld = helper.getCurrentAge(vm.birthDate) - helper.getCurrentAge(value);
  if (vm.regDocType && vm.regDocType.id === 1 && howOld >= 14) return true;
  else if(vm.regDocType && vm.regDocType.id === 2 && howOld >= 18) return true;
  else {
    return false;
  }
};


// Если паспорт активен, то не проверяем права


export default {
  mixins: [ validationMixin ],
  directives: {
    mask,
    touppercase: function(el, binding) {
      if(el.tagName.toLocaleUpperCase() !== 'INPUT') {
        let els = el.getElementsByTagName('input')
        el = els[0];
      }
      el.oninput = function (e) {
        el.value = el.value.toUpperCase();
      }
    }
  },
  data() {
    return {
      serNumMask: '#### ######',
      dateMask: '##.##.####',
      options: [{
        id: 1,
        title: 'Паспорт',
      },{
        id: 2,
        title: 'Водительское удостовирение'
      }],
      form: {
        activeFrom: '',
        subjects: [{
          fio: '',
          birthDate: '',
          regDocType: {
            id: 1,
            title: 'Паспорт',
          },
          regDocSerNum: '',
          regDocIssuedAt: '',
          regDocIssuedBy: '',
        }],
    }
    }
  },
  validations: {
    form: {
      activeFrom: {
        required,
        noToday: noToday(),
      },
      subjects: {
        required,
        $each: {
            fio: {
              required,
              totWord,
              сyrillicс,
            },
            birthDate: {
              required,
              checkOld: checkOld(18),
              minLength: minLength(10),
            },
            regDocType: {
              required
            },
            regDocSerNum: {
              required,
              minLength: minLength(11)
            },
            regDocIssuedAt: {
              required,
              checkDoc: checkDoc,
              minLength: minLength(10)
            },
            regDocIssuedBy: {
              required
            },
          }
      }
    }
  },
  methods: {
    submit() {
      console.log(helper.today());
    },
    addSubject() {
      this.form.subjects.push({
        fio: '',
        birthDate: '',
        regDocType: {
          id: 1,
          title: 'Паспорт',
        },
        regDocSeries: '',
        regDocNumber: '',
        regDocIssuedAt: '',
        regDocIssuedBy: '',
      })
    },
    delSubject(n) {
      this.form.subjects.splice(n, 1);
    },
    checkName(req, cir, totWord) {
      let res = [];
      if (!req) {
        res.push('Поле обязательно для заполнения');
      }
      if (!totWord) {
        res.push('Фамилия и Имя обязательны для заполнения');
      }
      if (!cir) {
        res.push('Только Кириллиа')
      }
      return res.join(', ')
    },
    checkBDay(req, age, minLength) {
      let res = [];
      if (!req) {
        res.push('Возраст обязателен для заполнения');
      }
      if (!minLength) {
        res.push('Заполни всю дату');
      }
      if (!age && minLength) {
        res.push('Ты еще совсем кроха, подрасти чуток!;)');
      }
      return res.join(', ')
    },
    checkDocType(req) {
      let res = [];
      if (!req) {
        res.push('Обязательно заполни');
      }
      return res.join(', ')
    },
    checkDocSerNum(req, ml) {
      let res = [];
      if (!req) {
        res.push('Обязательно заполни');
      }
      if (ml) {
        res.push('Минимальное кол-во символов 10');
      }
      return res.join(', ')
    },
    checkIssuedAt(req, old, minLength) {
      let res = [];
      if (!req) {
        res.push('Дата выдачи и возраст обязательны для заполнения');
      }
      if (!old && minLength && req) {
        res.push('Не соответствует минимальному возрасту при выдаче документа!');
      }
      return res.join(', ')
    },
    chackIssuedBt(req) {
      let res = [];
      if (!req) {
        res.push('Обязательно заполни');
      }
      return res.join(', ')
    }
  },

}
</script>

<style lang="scss" scoped>

</style>