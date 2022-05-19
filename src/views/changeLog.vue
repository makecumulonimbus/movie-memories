<template>
  <div class="details">
    <div class="text-left text-head pl-3 pr-3 pt-3">
      <i class="fas fa-info-circle" /><span> CHANGE LOG</span>
    </div>

    <div class="row">
      <div class="col-lg-8 text-left">
        <div class="log-ver mt-4 mb-4">
          <h4 class="current-ver">Version 2.0.0</h4>
          <div>- ปรับ UI ต่างๆ ทั้งหมดภายในเว็บ และเปลี่ยนสีเว็บเป็นแบบ gradient</div>
          <div>- เปลี่ยนฟอนต์ที่ใช้เป็น Sansation</div>
          <div>- เปลี่ยนหน้ารายละเอียดให้เป็นหน้าต่าง Modal เมื่อคลิก</div>
          <div>- เพิ่มปุ่มฟิลเตอร์ข้อมูล</div>
          <div>- ปิด autocomplete</div>
          <div>- นำคอมเมนต์หนังออก</div>
          <div>- เพิ่มหน้าเมนู Manage</div>
          <div>- แก้ไขการดึงข้อมูลหน้า Dashboard</div>
        </div>
        <div class="log-ver mt-4 mb-4">
          <h4 class="">Version 1.0.4</h4>
          <div>- แสดงชื่อเรื่อง ตัวอักษรแรกเป็นตัวพิมพ์ใหญ่เสมอ</div>
          <div>- บันทึกชื่อเรื่องเป็นตัวพิมพ์เล็ก และเคลียพื้นที่ว่างหน้าหลังข้อความ</div>
          <div>- ค้นหาชื่อเรื่องด้วยอักษรตัวพิมพ์เล็กอัตโนมัติ</div>
          <div>- แก้ไขการ refresh เมื่อทำการกด Enter ค้นหาชื่อเรื่อง</div>
          <div>- เพิ่มไอคอน font awesome และปรับไอคอนใหม่</div>
          <div>- ปรับขนาดปุ่ม สีปุ่ม สีพื้นหลัง</div>
          <div>- ปรับ rating form ใหม่ให้ดูสวยงามขึ้น</div>
          <div>- ใส่ badge ให้กับ status</div>
          <div>- เพิ่ม modal exit ก่อนจะออกจากระบบ</div>
          <div>- เพิ่มวันที่สร้าง และ แก้ไข ในหน้ารายละเอียด</div>
          <div>- แก้ไข style หน้า login</div>
        </div>
        <div class="log-ver mt-4 mb-4">
          <h4 class="">Version 1.0.3</h4>
          <div>- ปรับขนาดภาพ poster ให้มีขนาดที่เท่ากันทุกรูป</div>
          <div>- โชว์ rating บน poster</div>
          <div>- แก้ไข pagination ให้จำหน้าปัจจุบัน เมื่อเข้าไปยังหน้า detail</div>
        </div>
        <div class="log-ver mt-4 mb-4">
          <h4 class="">Version 1.0.2</h4>
          <div>- แก้ไข route ที่แสดงผล url ติดเครื่องหมาย # โดยนำออกไป</div>
          <div>- นำ required year ออกจาก modal ของ series และ anime</div>
          <div>- แก้ไขสีปุ่ม save และ delete ของ modal</div>
          <div>- ปรับ layout การแสดงผลในมือถือให้มีขนาดที่เหมาะสม</div>
          <div>- แก้ไขให้คลิกที่รูปได้อย่างเดียว</div>
          <div>- เปลี่ยนชื่อ comment เป็น spoil</div>
          <div>- ปรับตำแหน่ง loading ให้อยู่ตรงกลาง</div>
        </div>
        <div class="log-ver mt-4 mb-4">
          <h4 class="">Version 1.0.0</h4>
          <div>- ทดสอบการแสดงผลต่างๆ ภายในเว็บ</div>
        </div>
      </div>
      <div class="col-lg-4 text-left">
        <div class="img-log">
          <img src="../assets/log.svg" width="250px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changlog",
};
</script>

<style>
.current-ver {
  color: #5399ff;
}

.log-ver {
  padding-left: 35px;
}
.log-ver div {
  padding-left: 10px;
  font-size: 17px;
}
.img-log {
  padding: 80px 20px 20px 20px;
  display: block;
}
@media screen and (max-width: 991px) {
  .img-log {
    display: none;
  }
}
</style>
