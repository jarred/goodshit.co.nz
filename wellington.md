---
layout: category
permalink: wellington/index.html
---

<div class="articles">
<!-- for post in site.categories.wellington -->
{% for post in site.posts %}
  {% if forloop.index0 == 1 %}
    <div class="block span1 promotion"><a href="#" class="advertisment">&nbsp;</a></div>
  {% endif %}
  {% include grid-post.html %}
{% endfor %}
</div>