<template>
  <CSidebar 
    aside 
    :show="$store.state.asideShows"
    @update:show="(val) => $store.commit('set', ['asideShows', val])"
    colorScheme="light"
    overlaid
    size="lg"
  >
    <CSidebarClose @click.native="$store.commit('toggle', 'asideShows')"/>
  </CSidebar>
</template>

<script>
export default {
  name: 'TheAside',
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script>
