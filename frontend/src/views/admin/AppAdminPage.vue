<!--eslint-disable-->
<template>
  <div class="container page">
    <div>
      <h2>Admin Page</h2>
    </div>
    <div class="row">
      <the-admin-sidebar></the-admin-sidebar>
    </div>

  </div>
</template>

<script>

/* eslint-disable */
import TheAdminSidebar from '../../components/TheAdminSidebar.vue'

export default {
  name : 'Admin-Page',
  components: { TheAdminSidebar },

}

</script>