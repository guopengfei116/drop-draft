<template>
    <header>
        <mt-header fixed title="小买卖">
            <mt-button icon="back" slot="left" 
                v-if="$route.path != '/index'" @click="$router.go(-1)">
            </mt-button>
        </mt-header>
        <i></i>
    </header>
</template>

<script>
    export default {
        methods: {
            go() {
                this.$router.go(-1)
                console.log(1)
            }
        }
    }
</script>

<style scoped>
header i{
    display: block;
    height: 40px;
}
</style>