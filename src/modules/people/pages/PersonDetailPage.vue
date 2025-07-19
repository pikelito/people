<template>
  <q-card>
    <BaseHeader title="Detalle de Persona" />

    <BaseLoading v-if="loadingDetail" />

    <BaseError
      v-else-if="errorDetail"
      :message="errorDetail"
      @retry="fetchData"
    />

    <q-card-section v-else-if="selectedPerson">
      <PersonInfo :person="selectedPerson" />
      <q-list bordered separator class="q-mt-md">
        <ResourceList
          title="PELÍCULAS"
          :items="selectedPersonFilms"
          displayKey="title"
        />
        <ResourceList
          title="ESPECIES"
          :items="selectedPersonSpecies"
          displayKey="name"
        />
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePersonDetail } from '../composables/usePersonDetail';
import BaseHeader from '@/shared/components/base/BaseHeader.vue';
import BaseLoading from '@/shared/components/base/BaseLoading.vue';
import BaseError from '@/shared/components/base/BaseError.vue';
import PersonInfo from '../components/PersonInfo.vue';
import ResourceList from '../components/ResourceList.vue';

const route = useRoute();
const {
  selectedPerson,
  loadingDetail,
  errorDetail,
  fetchPersonById,
  selectedPersonFilms,
  selectedPersonSpecies,
  fetchPersonFilms,
  fetchPersonSpecies,
} = usePersonDetail();

const personId = computed(() => route.params.id as string);

const fetchData = async () => {
  if (personId.value) {
    await fetchPersonById(personId.value);
    const filmUrls = (selectedPerson.value?.films as string[]) || [];
    const speciesUrls = (selectedPerson.value?.species as string[]) || [];
    await fetchPersonFilms(filmUrls);
    await fetchPersonSpecies(speciesUrls);
  }
};

onMounted(() => {
  fetchData();
});
</script>
