<template>
  <div>
    <h2>Webcam</h2>

    <div class="mb-4">
      <button v-if="!stream && !loading" class="btn btn-primary" @click="startCamera">Activate camera</button>
      <button v-if="stream && !loading" class="btn btn-danger" @click="stopCamera">Stop camera</button>

      <div class="row align-items-center" v-if="loading">
        <div class="col-auto">
          <Spinner></Spinner>
        </div>
        <div class="col">Initializing...</div>
      </div>
    </div>

    <div class="bg-light">
      <div class="row justify-content-center">
        <div class="col video-wrapper">
          <div class="ratio ratio-4x3">
            <video ref="player"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner";

export default {
  name: "Webcam",
  components: {
    Spinner,
  },
  data() {
    return {
      stream: null,
      loading: false,
    }
  },
  methods: {
    stopCamera() {
      if (this.stream) {
        const tracks = this.stream.getTracks();
        tracks.forEach(track => track.stop());
        const player = this.$refs.player;
        player.srcObject = null;
        this.stream = null;
        this.loading = false;
      }
    },
    startCamera() {
      if (this.stream) {
        return;
      }

      this.loading = true;
      const mediaPromise = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      mediaPromise.then((stream) => {
        this.stream = stream;
        console.log(stream);
        const player = this.$refs.player;
        player.srcObject = stream;
        player.onloadeddata = () => {
          player.play();
          this.loading = false;
        };

      }).catch((error) => {
        console.log(error);
        this.loading = false;
      });
    }
  },
  beforeDestroy() {
    this.stopCamera();
  }
}
</script>

<style scoped>
.video-wrapper {
  max-width: 700px;
}
</style>
