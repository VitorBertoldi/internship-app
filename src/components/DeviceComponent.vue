<template>
  <div class="col-md-6 col-xs-12 text-center">
    <h3>{{ $t('DEVICES') }}</h3>

    <q-card v-for="device in devices" :key="device.deviceCode" class="q-my-lg">
      <q-card-section>
        <i
          class="material-icons led"
          :style="{ color: getColorByStatus(device.status) }"
        >
          fiber_manual_record
        </i>
        {{ device.deviceCode }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue';
import { Device, Status } from './models';
import { ping } from 'src/services/deviceServices';

export default defineComponent({
  name: 'DeviceComponent',

  data() {
    return {
      devices: new Array<Device>(),
      currentTime: 0,
    };
  },

  async created() {
    const pingResponse: number = await ping();
    console.log('Ping response >>> ', pingResponse);

    // Update currentTime as before
    this.currentTime = pingResponse;
    console.log('Current time >>> ', this.currentTime);

    // Fetch devices data
    const devices = await this.fetchDevices();
    console.log('Fetched devices >>> ', devices);

    // Update devices data
    this.devices = devices;
  },

  methods: {
    getColorByStatus(status: keyof typeof Status) {
      const colors: Record<keyof typeof Status, string> = {
        IDLE: '#1DFF1D',
        PROCESSING: '#00FFD4',
      };

      return colors[status];
    },

    async fetchDevices() {
      try {
        const response = await api.get('device/v1/get-devices', {});
        return response.data as Device[]; // Cast response data to Device[]
      } catch (error) {
        console.error('Error fetching devices:', error);
        return []; // Return empty array on error
      }
    },
  },
});
</script>
