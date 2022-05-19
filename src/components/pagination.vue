<template>
  <div class="pagination-container">
    <div class="numItem" v-if="start != totalItem">
      {{ start }} - {{ end }} of {{ totalItem }}
    </div>
    <div class="numItem" v-if="start == totalItem">
      {{ start }} of {{ totalItem }}
    </div>
    <div class="pagination-item">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        @input="updatePage(currentPage)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import "../assets/scss/style.scss";

export default {
  name: "Pagination",
  props: ["currentPage", "totalItem", "itemPerPage", "start", "end"],
  data() {
    return {
      perPage: this.itemPerPage,
    };
  },
  methods: {
    updatePage(page) {
      this.$emit("selectedPage", page - 1);
    },
  },
  computed: {
    rows() {
      return this.totalItem;
    },
  },
};
</script>

<style scoped>
::v-deep .page-item.active .page-link {
  border-color: #5399ff !important;
  color: white !important;
  background-image: linear-gradient(
    255deg,
    #4457ff -1.09%,
    #5cc4ff 100%
  ) !important;
  background-size: 150% !important;
}
::v-deep .page-item.active .page-link:hover {
  color: white !important;
  background-position: right !important;
}
::v-deep .page-link {
  color: #5399ff !important;
}
::v-deep .page-link:focus {
  box-shadow: unset;
}

.pagination-container {
  padding: 20px 15px 10px 15px;
  display: flex;
  justify-content: space-between;
}
</style>