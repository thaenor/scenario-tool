const firebaseConfig = {
  apiKey: 'AIzaSyC9DZtmJ_bDrC0YkOxVWF2S2jP4gpX06f8',
  authDomain: 'scenario-tool.firebaseapp.com',
  databaseURL: 'https://scenario-tool.firebaseio.com',
  projectId: 'scenario-tool',
  storageBucket: 'scenario-tool.appspot.com',
  messagingSenderId: '75545633744',
  appId: '1:75545633744:web:e1b43c7440c2290d020fd5',
};
const FIRE = {
  scenarios: 'scenarios',
  caregivers: 'caregivers',
};
const STORAGE = {
  scenario_id: 'scenarioId',
  scenario_contents: 'scenarioContents',
  user_name: 'user_name',
};
const ROUTES = {
  root: '/',
  main: '/main',
  login: '/login',
  auth: '/auth',
  scenario: {
    viewer: '/viewer',
    editor: '/editor',
    dynamic_viewer: (id) => {
      return `/viewer?title=${id}`;
    },
    dynamic_editor: (id) => {
      return `/editor?title=${id}`;
    },
  },
  caregiver: {
    viewer: '/caregiver/viewer',
    editor: '/caregiver/editor',
    dynamic_viewer: (id) => {
      return `/caregiver/viewer?title=${id}`;
    },
    dynamic_editor: (id) => {
      return `/caregiver/editor?title=${id}`;
    },
  },
};
const MESSAGES = {
  save_scenario_succes: 'Novo cenário criado com sucesso!',
  save_scenario_error:
    'Ocorreu um erro ao gravar o cenário. Volte ao menu principal e tente outra vez',
  update_scenario_succes: 'Documento actualizado com sucesso!',
  save_scenario_next_steps: 'Gostaria de adicionar um perfil de cuidador?',
  caregiver_needs_context:
    'Ocorreu algo de errado, não foi encontrada a referência do cenário ao qual associar este cuidador \nvolte ao menu principal e tente novamente criar um cuidador',
  save_caregiver_error:
    'Ocorreu um erro ao gravar o cuidador. Por favor tente novamente a partir do menu principal',
  save_caregiver_success: 'Cuidador gravado e associado ao cenário',
  general_error: 'Ocorreu um erro',
  reading_error:
    'Ocorreu um erro a ler o documento, certifique que o URL está correcto.',
};
const USER = localStorage.getItem(STORAGE.user_name);

firebase.initializeApp(firebaseConfig);

// firebase.firestore().enablePersistence()
//   .catch(function(err) {
//       console.warn(err);
//   });