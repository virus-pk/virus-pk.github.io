<template>
  <section class="bg-dark py-3" style="height:100vh;">
    <b-container fluid>
      <b-row>
        <b-col>
          <div>
            <b-navbar toggleable="lg" type="light" variant="warning">
              <b-navbar-brand href="#">virus-pk.github.io</b-navbar-brand>
              <b-navbar-toggle target="nav_collapse" />
              <b-collapse id="nav_collapse" is-nav>
                <!-- Left aligned nav items -->
                <b-navbar-nav>
                  <b-nav-item href="#">Printable Résumé</b-nav-item>
                </b-navbar-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                  <b-nav-form>
                    <b-form-input
                      size="sm"
                      class="mr-sm-2 rounded-pill px-3"
                      type="text"
                      placeholder="Search Projects"
                    />
                    <b-button
                      size="sm"
                      class="my-2 my-sm-0 rounded-pill px-3 disabled"
                      >Search</b-button
                    >
                  </b-nav-form>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <nuxt />
  </section>
</template>

<style></style>
