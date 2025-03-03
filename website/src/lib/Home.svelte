<script lang="ts">
    import { onMount } from "svelte";
    import icon from "../assets/icon.png";

    let slogans: String[]
    let slogan: String
    slogans = [
        "Reinvent Your ToDos - Not the Wheel.",
        "Because productivity should feel simple, not stressful.",
        "Because you deserve more organization in your life.",
    ]


    function getRandom(top: number, bottom: number) {
        let return_value = (Math.floor(Math.random() * (top - bottom + 1)) + bottom) - 1
        console.log(return_value);
        return return_value
    }

    onMount(()=> {
        slogan = slogans[getRandom(slogans.length, 1)]
    })
</script>

<div class="w-full h-[100vh] flex flex-col justify-center items-center gap-4">
    <img src={icon} alt="Icon" class="w-auto h-20 drop-shadow-main-small dark:drop-shadow-dark-main" />
    <div class="md:text-4xl text-3xl text-center text-text dark:text-dark-text drop-shadow-main dark:drop-shadow-dark-main">Welcome to Issuence</div>
    <div class="text-xl text-center text-text dark:text-dark-text">{slogan}</div>
  </div>