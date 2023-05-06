<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-col>
            <pre>{{ windowObject }}</pre>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            {{ message }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            user.$id:<b>{{ user?.$id ?? "not logged in" }}</b>
            <br />
            user.email <b>{{ user?.email ?? "not logged in" }}</b>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button v-on:click="createEmailSession" expand="block">Login with Email/Password</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button v-on:click="createOAuth2Session" expand="block">Login with Github</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button v-on:click="logout" expand="block">Logout</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import { Client, Account, Models } from "appwrite";
import { onMounted, ref } from "vue";

const user = ref<Models.User<Models.Preferences>>();
const account = ref<Account>();
const message = ref("");
const windowObject = ref(window.location.origin);

const client = new Client().setEndpoint("https://cloud.fire-and-forget.de/v1").setProject("test");
account.value = new Account(client);

const createEmailSession = async () => {
  try {
    await account.value?.createEmailSession("test@test.dev", "test@test.dev");
    user.value = await account.value?.get();
  } catch (error: any) {
    console.log(error.message);
    message.value = error.message;
  }
};

const createOAuth2Session = () => {
  account.value?.createOAuth2Session("github", window.location.origin, window.location.origin);
};

const logout = async () => {
  try {
    await account.value?.deleteSessions();
  } catch (error: any) {
    console.log(error.message);
    message.value = error.message;
  }

  window.location.reload();
};

onMounted(async () => {
  try {
    user.value = await account.value?.get();
  } catch (error: any) {
    console.log(error.message);
    message.value = error.message;
  }
});
</script>
