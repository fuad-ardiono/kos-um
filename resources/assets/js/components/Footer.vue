<template>
    <div>
        <footer class="footer">
            <b-container>
                <p class="text-center">
                    &copy; Universitas Mulia - 2019<br><br>
                    Code with ❤️ by <a href="https://github.com/fuad-ardiono" target="_blank">Fuad Ardiono</a> 
                </p>
            </b-container>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Footer",
}
</script>

<style lang="scss">
    .footer {
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;
        color: #304455;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        transition: background-color 0.3s ease-in-out;
    }
</style>