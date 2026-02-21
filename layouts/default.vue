<template>
  <section class="bg-dark min-vh-100">
    <b-container fluid>
      <b-row>
        <b-col>
          <b-navbar toggleable="lg" type="light" variant="warning">
            <b-navbar-brand href="#home">Tauqeer Ahmad</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse" />
            <b-collapse id="nav_collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item href="#about">About</b-nav-item>
                <b-nav-item href="#projects">Projects</b-nav-item>
                <b-nav-item href="#skills">Skills</b-nav-item>
                <b-nav-item href="#contact">Contact</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-col>
      </b-row>
    </b-container>
    <nuxt />
  </section>
</template>
