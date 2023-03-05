<template>
  <div>
    <LoadingComponent v-if="loading" />
    <div class="container">
      <div class="forms-container">
        <div class="signin">
          <b-form @submit.prevent="login" class="sign-in-form">
            <img
              src="../assets/movie_undraw.svg"
              alt=""
              class="img-undraw pb-4"
              width="250px"
              loading="lazy"
            />
            <div class="input-field">
              <div class="icon"><i class="fas fa-envelope"></i></div>
              <input
                type="email"
                placeholder="Email"
                v-model="email"
                required
              />
            </div>
            <div class="input-field">
              <div class="icon"><i class="fas fa-lock"></i></div>
              <input
                type="password"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <b-button type="submit" class="btn-login">LOGIN</b-button>
          </b-form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <img src="../assets/logo.png" alt="" loading="lazy"/>
            <div class="pt-4 logo-text">MOVIE</div>
            <div class="logo-text sub-text">MEMORIES</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/style.scss";
import firebaseApp from "@/firebase/firebase_app";
import LoadingComponent from "@/components/loading";

export default {
  name: "LoginPage",
  components: { LoadingComponent },
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.loading = true;
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.notifyAlert("success", "Welcome To Movie Memories");
          this.$router.replace("movie");
        })
        .catch((err) => {
          this.loading = false;
          if (err.code == "auth/wrong-password") {
            this.notifyAlert("error", "Worng password");
          } else if (err.code == "auth/user-not-found") {
            this.notifyAlert("error", "User not found");
          } else if (err.code == "auth/too-many-requests") {
            this.notifyAlert("error", "Too many requests");
          }
        });
    },
    
    notifyAlert(type, text) {
      if (type == "success") {
        this.$toast(text, {
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: true,
          timeout: 3000,
          icon: "fa fa-home",
        });
      } else if (type == "error") {
        this.$toast.error(text, {
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: true,
          timeout: 3000,
          icon: "fa fa-exclamation-triangle",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  background-color: #fafafa;
  min-height: 100vh;
  overflow: hidden;
  padding-right: 0px !important;
  padding-left: 0px !important;
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.signin {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 70%;
  width: 50%;
  /* transition: 1s 0.7s ease-in-out; */
  display: grid;
  grid-template-columns: 1fr;
  z-index: 6;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 1s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #fff;
  margin: 10px 0;
  height: 55px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  border: 2px solid #41fe97;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: 130%;
  right: 8%;
  transform: translateY(-50%);
  background-image: linear-gradient(213.65deg, #41ff8d 11.52%, #42f4ff 105.45%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 25% 3rem 12%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}
.panel .content img {
  width: 200px;
}
.panel .content .logo-text {
  font-size: 60px;
}
.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

@media (max-width: 870px) {
  .img-undraw {
    display: none;
  }
  .input-field {
    max-width: 380px;
    width: 100%;
    background-color: white;
    margin: 10px 0;
    height: 51px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    border: 2px solid #42f9c9;
    position: relative;
  }

  .input-field i {
    text-align: center;
  }
  .container {
    min-height: 500px;
    height: 100vh;
  }
  .signin {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -120%);
    /* transition: 1s 0.8s ease-in-out; */
    z-index: 6;
  }

  .signin,
  .container.sign-up-mode .signin {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8% 0rem 8%;
    grid-column: 1 / 2;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .panel .content {
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .panel .content img {
    width: 120px;
    padding-top: 10px;
  }

  .panel .content .logo-text {
    font-size: 45px;
  }
  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 50%;
    bottom: 68%;
    right: initial;
    top: -90%;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .signin {
    top: 5%;
    transform: translate(-50%, 0);
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
@media (min-width: 576px) {
  .container {
    max-width: unset !important;
  }
}
@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 75%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

.logo-text.sub-text {
  margin-top: -15px;
}

@media (max-height: 610px) {
  .logo-text {
    display: none;
  }
}
.btn-login {
  background-size: 150%;
  border-radius: 10px;
  background-image: linear-gradient(255deg, #4457ff -1.09%, #5cc4ff 100%);
  color: white !important;
  height: 51px;
  transition: 0.3s;
  font-size: 18px;
}
.btn-login:hover {
  transition: 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25) !important;
  background-position: right;
}

.btn-login {
  width: 150px;
}

.input-field .icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>