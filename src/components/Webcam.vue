<template>
  <div>
    <h2>Webcam</h2>

    <div class="mb-4">
      <button v-if="!stream && !loading" class="btn btn-primary" @click="startCamera">Activate camera</button>
      <button v-if="stream && !loading" class="btn btn-danger" @click="stopCamera">Stop camera</button>

      <LoadingIndicator v-if="loading">Initializing...</LoadingIndicator>
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
import LoadingIndicator from "./LoadingIndicator";

export default {
  name: "Webcam",
  components: {
    LoadingIndicator,
  },
  data() {
    return {
      // used to store the camera stream
      stream: null,
      // used to show loading indicator while camera is initializing
      loading: false,
    }
  },
  methods: {
    stopCamera() {
      if (this.stream) {
        // the stream contains tracks. each track needs to be stopped
        const tracks = this.stream.getTracks();
        tracks.forEach(track => track.stop());

        // to clear everything up, the players srcObject will also be set to null
        const player = this.$refs.player;
        player.srcObject = null;

        // setting the component data model to its defaults
        this.stream = null;
        this.loading = false;
      }
    },
    startCamera() {
      // if the stream is already setup ignore the call
      if (this.stream) {
        return;
      }

      // showing the loading indicator
      this.loading = true;

      // requesting the camera feed by using the official browser API
      const mediaPromise = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      // this is an async call. the user will be asked if the camera access should be allowed.
      mediaPromise.then((stream) => {
        // user allowed camera access

        // storing the stream locally
        this.stream = stream;

        // getting the DOM reference to the player node
        const player = this.$refs.player;
        // the stream is set to the video player
        player.srcObject = stream;
        player.onloadeddata = () => {
          // when the player has loaded the stream we start the player.
          // without that the player would do nothing
          player.play();
          this.loading = false;
        };
      }).catch((error) => {
        // user did not allow access to camera or no camera is available
        console.log(error);
        this.loading = false;
      });
    }
  },
  // like the ngOnDestroy hook. It will be called before the component gets destroyed
  beforeDestroy() {
    // turn off camera stream if it is still running
    this.stopCamera();
  }
}
</script>

<style scoped>
.video-wrapper {
  max-width: 700px;
}
</style>
