<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { watch } from 'vue';

const { result, loading, error, refetch, onResult } = useQuery<string>(gql`
	query {
		testHello
	}
`, null, { fetchPolicy: 'no-cache' });

const value = () => {
	refetch();
};

onResult((param, context) => {
	console.log(`RESULT HAS ESDGLDKS`);
	console.log(context);
	console.log(param);
	console.log(param.data);
	console.log(result.value);
});

watch(result, () => {
	console.log(`Was loaded: `, result.value);
});

</script>
<template>
	<h1>RESULT: {{ result }}</h1>
	<h1>LOADING: {{ loading }}</h1>
	<h1>ERROR: {{ error }}</h1>
	<button @click="value">FETCH</button>
</template>
<style></style>