<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Home from "./lib/Home.svelte";
  import Why from "./lib/Why.svelte";
  import Footer from "./lib/Footer.svelte";
  import Download from "./lib/Download.svelte";
  import { onMount } from "svelte";
  import { downloadLink } from "./stores";

  const githubRepo = "https://api.github.com/repos/Kuttesch/Issuence/releases/latest";

  async function getLink() {
    try {
      const response = await fetch(githubRepo);
      if (response.ok) {
        const data = await response.json();
        $downloadLink =
          (data.assets && data.assets[0]?.browser_download_url) ||
          "https://github.com/Kuttesch/Issuence/releases/latest";
      } else {
        console.error("Failed to fetch the latest release");
      }
    } catch (error) {
      console.error("Error fetching the latest release:", error);
    }
  }
  onMount(async () => {
    getLink();
  });
</script>

<div class="w-full h-auto flex flex-col justify-center items-center gap-8">
  <Header />
  <Home />
  <Why />

  <Download />
  <Footer />
</div>
