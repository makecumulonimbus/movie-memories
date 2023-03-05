<template>
     <b-modal id="modal-delete" hide-footer>
      <template #modal-header>
        <span class="modal-header-text"
          ><i class="fas fa-trash" /> DELETE
          <span class="capital-text">{{ headName }}</span></span
        >
        <span class="close-icon" @click="toggleModal"
          ><i class="fas fa-times" />
        </span>
      </template>
      <template>
        <div class="text-center" v-if="imageURL">
          <img :src="imageURL" width="120px" class="img-del" loading="lazy" alt=""/>
        </div>
        <div class="text-center text-del">
          Are you sure you want to delete this {{ headName }} ?
        </div>
        <div class="btn-delete">
          <b-button @click="deleteData" class="btn-confirm">DELETE</b-button>
          <b-button @click="toggleModal" class="btn-cancle">CANCLE</b-button>
        </div>
      </template>
    </b-modal>
</template>

<script>
import "@/assets/scss/style.scss";

export default {
   name : "ModalDelete",
   props : ["headName","imageURL"],
   methods:{
       toggleModal(){
           this.$emit("toggleModal")
       },
       deleteData(){
           this.$emit("deleteData")
       }
   }
}

</script>