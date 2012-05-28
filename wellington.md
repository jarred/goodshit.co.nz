---
layout: category
permalink: wellington/index.html
---

<div class="articles">
<!-- for post in site.categories.wellington -->
{% for post in site.posts %}
  {% include grid-post.html %}
{% endfor %}
</div>