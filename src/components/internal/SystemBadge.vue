<script lang="ts" setup>
import UaParser from 'ua-parser-js'

const props = defineProps<{
  // ua just for compatibility
  ua?: string
  // only os browser
  os?: string
  browser?: string
}>()
const uaParser = new UaParser()

const ua = uaParser.setUA(props.ua || '')
const osResult = ua.getOS()
const iBrowser = ua.getBrowser()
const iDevice = ua.getDevice()
const iCPU = ua.getCPU()

const systemName = ref((osResult.name || props.os || '').toLowerCase())
const browserName = ref((iBrowser.name || props.browser || '').toLowerCase())
const deviceName = ref((iDevice.vendor || '').toLowerCase())
const cpuName = ref(iCPU.architecture)
</script>

<template>
  <div class="flex items-center" m="t-2" border="~ gray-200 dark:gray-700" p="1">
    <el-tooltip v-if="systemName" :content="systemName">
      <span class="mx-1 inline-flex">
        <div v-if="systemName.includes('windows')" i-ri-windows-line style="color: #0078d7" />
        <div v-else-if="systemName.includes('mac os')" i-ri-mac-line style="color: #555555;" />
        <div v-else-if="systemName.includes('linux')" i-simple-icons-linux style="color: #0b57a4" />
        <div v-else-if="systemName.includes('android')" i-ri-android-line style="color: #A4C639" />
        <div v-else-if="systemName.includes('ios')" i-ri-apple-line style="color: black" />
        <span v-else>{{ systemName }}</span>
      </span>
    </el-tooltip>
    <el-tooltip v-if="browserName" :content="browserName">
      <span class="mx-1 inline-flex">
        <div v-if="browserName.includes('chrome')" i-ri-chrome-line style="color: #FFCD46" />
        <div v-else-if="browserName.includes('safari')" i-ri-safari-line style="color: #006CFF" />
        <div v-else-if="browserName.includes('firefox')" i-ri-firefox-line style="color: #E66000" />
        <div v-else-if="browserName.includes('edge')" i-ri-edge-new-line />
        <!-- <div i-ri-edge-line v-else-if="browserName === 'edge'" style="color: #3277BC" /> -->
        <div v-else i-ri-window-line />
      </span>
    </el-tooltip>
    <el-tooltip v-if="deviceName" :content="`${iDevice.vendor} ${iDevice.model}`">
      <span class="mx-1 inline-flex">
        <div v-if="deviceName === 'xiaomi'" i-simple-icons-xiaomi style="color: #fd4900" />
        <div v-else-if="iDevice.type === 'tablet'" i-ri-tablet-line />
        <div v-else i-ri-smartphone-line />
      </span>
    </el-tooltip>
    <el-tooltip v-if="cpuName" :content="iCPU.architecture">
      <span class="mx-1 inline-flex">
        <div i-ri-cpu-line />
      </span>
    </el-tooltip>
  </div>
</template>
