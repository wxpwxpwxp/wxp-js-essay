// @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    
import { defineComponent, ref } from 'vue';
import other from './other.vue';

export default defineComponent({
  name: 'ChenQu',
  components: {
    other,
  },
  setup() {
    const eyeRef = ref('小');
    const mouthRef = ref('大');

    const say = () => {
      alert('美女，约么');
    };

    return {
      eye: eyeRef,
      mouth: mouthRef,
      say,
    };
  },
});

    