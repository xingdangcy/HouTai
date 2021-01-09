<template>
  <div class="list-head">{{ title }}<van-icon name="arrow" /></div>
</template>

<script>
export default {
  name: "",
  props: ["title"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
.list-head {
  line-height: 40px;
  text-align: center;
  border-bottom: #dddddd 1px solid;
}
</style>