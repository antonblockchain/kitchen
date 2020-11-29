<template>
  <label class="order__file order__label">
    <progress-bar
      v-if="showProgress"
      :options="options"
      :value="Math.round(uploadValue)"
      class="order__file_progress"
    />
    <input
      type="file"
      class="order__file_input"
      accept="image/*"
      @change="previewImage"
    />
    <span class="order__file_content" :class="{ active: picture !== null }">
      <svg
        width="32"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-53 1 511 511.999"
        fill="#d9d9d9"
      >
        <path
          d="M276.41 3.957C274.062 1.484 270.844 0 267.508 0H67.778C30.921 0 .5 30.3.5 67.152v377.692C.5 481.699 30.922 512 67.777 512h271.086c36.856 0 67.278-30.3 67.278-67.156V144.94c0-3.214-1.485-6.304-3.586-8.656zm3.586 39.7l84.469 88.671h-54.91c-16.325 0-29.559-13.11-29.559-29.433zm58.867 443.609H67.777c-23.125 0-42.543-19.168-42.543-42.422V67.152c0-23.125 19.293-42.418 42.543-42.418h187.485v78.16c0 30.051 24.242 54.168 54.293 54.168h71.851v287.782c0 23.254-19.293 42.422-42.543 42.422zm0 0"
        />
        <path
          d="M305.102 401.934H101.539c-6.8 0-12.367 5.562-12.367 12.367 0 6.8 5.566 12.367 12.367 12.367h203.688c6.8 0 12.367-5.566 12.367-12.367 0-6.805-5.567-12.367-12.492-12.367zM140 268.863l50.953-54.789v135.051c0 6.8 5.567 12.367 12.367 12.367 6.805 0 12.368-5.566 12.368-12.367v-135.05l50.953 54.788c2.472 2.594 5.691 3.957 9.027 3.957 2.969 0 6.062-1.113 8.41-3.34 4.95-4.699 5.32-12.492.621-17.437l-72.472-77.79c-2.352-2.472-5.567-3.956-9.028-3.956-3.465 0-6.68 1.484-9.027 3.957l-72.473 77.789c-4.699 4.945-4.328 12.86.617 17.437 5.196 4.7 12.985 4.329 17.684-.617zm0 0"
        />
      </svg>
      <span>Прикрепить файл</span>
      <img v-show="picture" class="order__file_img" :src="picture" alt="img" />
    </span>
  </label>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Shopper-file",
  data() {
    return {
      imageData: null,
      uploadValue: 0,
      showProgress: false,
      options: {
        text: {
          color: "#fff",
          shadowEnable: false,
          shadowColor: "#000000"
        },
        progress: {
          color: "#fa7268",
          backgroundColor: "#333"
        },
        layout: {
          height: 80,
          width: 80,
          verticalTextAlign: 0,
          horizontalTextAlign: 0,
          zeroOffset: 0,
          strokeWidth: 16,
          progressPadding: 0,
          type: "circle"
        }
      }
    };
  },
  computed: {
    currentOrder() {
      return this.$store.getters.currentOrder;
    },
    picture: {
      get() {
        return this.currentOrder.shopper.file;
      },
      set(val) {
        this.currentOrder.shopper.file = val;
      }
    }
  },
  methods: {
    previewImage(event) {
      this.imageData = event.target.files[0];
      if (this.imageData) {
        this.uploadValue = 0;
        this.picture = null;
        this.onUpload();
      }
    },
    onUpload() {
      this.picture = null;
      this.showProgress = true;
      const storageRef = firebase
        .storage()
        .ref(`${this.currentOrder.order}_${this.currentOrder.user}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            this.showProgress = false;
          });
        }
      );
    }
  }
};
</script>
