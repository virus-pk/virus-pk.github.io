<template>
  <section class="py-4">
    <b-container>
      <b-row id="home" class="align-items-center py-5">
        <b-col md="7" class="mb-4 mb-md-0">
          <p class="text-warning mb-2">Hello, I'm</p>
          <h1 class="display-4 font-weight-bold text-white">Tauqeer Ahmad</h1>
          <p class="lead text-light">
            Web developer building practical front-end experiences with Vue/Nuxt
            and a strong interest in open source.
          </p>
          <b-button
            variant="warning"
            class="mr-2 rounded-pill px-4"
            href="#projects"
            >View Projects</b-button
          >
          <b-button
            variant="outline-light"
            class="rounded-pill px-4"
            href="#contact"
            >Contact Me</b-button
          >
        </b-col>
        <b-col md="5" class="text-center">
          <div class="profile-badge mx-auto">
            <h2 class="mb-0">TA</h2>
          </div>
        </b-col>
      </b-row>

      <b-row id="about" class="py-4">
        <b-col>
          <h2 class="text-warning mb-3">About</h2>
          <p class="text-light mb-0">
            I build clean and responsive web interfaces, enjoy solving
            real-world problems, and continuously improve through open-source
            learning and personal projects.
          </p>
        </b-col>
      </b-row>

      <b-row id="projects" class="py-4">
        <b-col>
          <h2 class="text-warning mb-4">Projects</h2>
        </b-col>
        <b-col
          v-for="project in projects"
          :key="project.title"
          md="4"
          class="mb-3"
        >
          <b-card
            :title="project.title"
            :sub-title="project.stack"
            bg-variant="dark"
            text-variant="white"
            class="h-100 border-warning"
          >
            <b-card-text>{{ project.description }}</b-card-text>
            <b-button
              :href="project.link"
              target="_blank"
              size="sm"
              variant="warning"
              >Open</b-button
            >
          </b-card>
        </b-col>
      </b-row>

      <b-row id="skills" class="py-4">
        <b-col>
          <h2 class="text-warning mb-3">Skills</h2>
          <div>
            <b-badge
              v-for="skill in skills"
              :key="skill"
              variant="warning"
              class="mr-2 mb-2 p-2"
              >{{ skill }}</b-badge
            >
          </div>
        </b-col>
      </b-row>

      <b-row id="contact" class="py-4">
        <b-col>
          <h2 class="text-warning mb-3">Contact</h2>
          <p class="text-light">
            Open to freelance work, collaborations, and full-time opportunities.
          </p>
          <ul class="list-unstyled text-light">
            <li>
              <strong>Email:</strong>
              <a class="text-warning" href="mailto:tauqeer@example.com"
                >tauqeer@example.com</a
              >
            </li>
            <li>
              <strong>GitHub:</strong>
              <a
                class="text-warning"
                href="https://github.com/virus-pk"
                target="_blank"
                >github.com/virus-pk</a
              >
            </li>
            <li>
              <strong>LinkedIn:</strong>
              <a
                class="text-warning"
                href="https://www.linkedin.com"
                target="_blank"
                >linkedin.com/in/your-profile</a
              >
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: 'Portfolio Website',
          stack: 'Nuxt.js, BootstrapVue',
          description:
            'Personal website deployed on GitHub Pages to highlight work and profile.',
          link: 'https://virus-pk.github.io/'
        },
        {
          title: 'License Learning Startup',
          stack: 'JavaScript, Node.js',
          description:
            'A practice initiative to learn open-source licensing and documentation workflows.',
          link: 'https://github.com/virus-pk'
        },
        {
          title: 'UI Component Practice',
          stack: 'Vue.js',
          description:
            'Reusable UI component experiments for forms, cards, and responsive layouts.',
          link: 'https://github.com/virus-pk'
        }
      ],
      skills: [
        'JavaScript',
        'Vue.js',
        'Nuxt.js',
        'Bootstrap',
        'Node.js',
        'Git',
        'GitHub Pages'
      ]
    }
  }
}
</script>

<style scoped>
.profile-badge {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffc107, #ff9800);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #212529;
  font-size: 3rem;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(255, 193, 7, 0.4);
}
</style>
