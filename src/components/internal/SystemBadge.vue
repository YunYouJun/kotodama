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
const os = ua.getOS()
const browser = ua.getBrowser()
const device = ua.getDevice()
const cpu = ua.getCPU()

const systemName = ref((os.name || props.os || '').toLowerCase())
const browserName = ref((browser.name || props.browser || '').toLowerCase())
const deviceName = ref((device.vendor || '').toLowerCase())
const cpuName = ref(cpu.architecture)
</script>

<template>
  <div class="flex items-center" m="t-2" border="~ gray-200 dark:gray-700" p="1">
    <el-tooltip v-if="systemName" :content="systemName">
      <span class="inline-flex mx-1">
        <i-ri-windows-line v-if="systemName.includes('windows')" style="color: #0078d7" />
        <i-ri-mac-line v-else-if="systemName.includes('mac os')" style="color: #555555;" />
        <i-simple-icons-linux v-else-if="systemName.includes('linux')" style="color: #0b57a4" />
        <i-ri-android-line v-else-if="systemName.includes('android')" style="color: #A4C639" />
        <i-ri-apple-line v-else-if="systemName.includes('ios')" style="color: black" />
        <span v-else>{{ systemName }}</span>
      </span>
    </el-tooltip>
    <el-tooltip v-if="browserName" :content="browserName">
      <span class="inline-flex mx-1">
        <i-ri-chrome-line v-if="browserName.includes('chrome')" style="color: #FFCD46" />
        <i-ri-safari-line v-else-if="browserName.includes('safari')" style="color: #006CFF" />
        <i-ri-firefox-line v-else-if="browserName.includes('firefox')" style="color: #E66000" />
        <i-logos-microsoft-edge v-else-if="browserName.includes('edge')" />
        <!-- <i-ri-edge-line v-else-if="browserName === 'edge'" style="color: #3277BC" /> -->
        <i-ri-window-line v-else />
      </span>
    </el-tooltip>
    <el-tooltip v-if="deviceName" :content="`${device.vendor} ${device.model}`">
      <span class="inline-flex mx-1">
        <i-simple-icons-xiaomi v-if="deviceName === 'xiaomi'" style="color: #fd4900" />
        <i-ri-tablet-line v-else-if="device.type === 'tablet'" />
        <i-ri-smartphone-line v-else />
      </span>
    </el-tooltip>
    <el-tooltip v-if="cpuName" :content="cpu.architecture">
      <span class="inline-flex mx-1">
        <i-ri-cpu-line />
      </span>
    </el-tooltip>
  </div>
</template>
