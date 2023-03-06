<template>
  <div>
    <div id="context-menu" style="left: 649px; top: 149.5px;" class="reverse-x reverse-y"><ul>
      <li><a class="icon icon-edit" href="/issues/1/edit">편집</a></li>

      <li class="folder">
        <a href="#" class="submenu">상태</a>
      <ul>
      <li>
        <a class=" icon icon-checked disabled disabled" onclick="return false;" href="#">신규</a>
      </li>

      <li class="folder">
      <a href="#" class="submenu">유형</a>
      <ul>
        li><a class=" icon icon-checked disabled disabled" onclick="return false;" href="#">결함</a></li>
      </ul>
      </li>

      <li class="folder">
      <a href="#" class="submenu">우선순위</a>
      <ul>
      <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bpriority_id%5D=5">즉시</a></li>
      <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bpriority_id%5D=4">긴급</a></li>
      <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bpriority_id%5D=3">높음</a></li>
      <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bpriority_id%5D=2">보통</a></li>
      <li><a class=" icon icon-checked disabled disabled" onclick="return false;" href="#">낮음</a></li>
      </ul>
      </li>


      <li class="folder">
      <a href="#" class="submenu">담당자</a>
      <ul>
      <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bassigned_to_id%5D=1">&lt;&lt; 나 &gt;&gt;</a></li>
      <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bassigned_to_id%5D=1">Redmine admin</a></li>
      <li><a class=" icon icon-checked disabled disabled" onclick="return false;" href="#">미지정</a></li>
      </ul>
      </li>


      <li class="folder">
      <a href="#" class="submenu">진척도</a>
      <ul>
        <li><a class=" icon icon-checked disabled disabled" onclick="return false;" href="#">0%</a></li>
        <li><a class="" rel="nofollow" data-method="patch" href="/issues/1?back_url=%2Fissues&amp;ids%5B%5D=1&amp;issue%5Bdone_ratio%5D=10">10%</a></li>
      </ul>
      </li>


      <li class="folder">
      <a href="#" class="submenu">일감관람자</a>
      <ul>
      <li><a class="icon icon-add" data-remote="true" href="/watchers/new?object_id%5B%5D=1&amp;object_type=issue">추가</a></li>
      </ul>
      </li>

      <li><a class="issue-1-watcher icon icon-fav" data-remote="true" rel="nofollow" data-method="delete" href="/watchers/watch?object_id=1&amp;object_type=issue">관심끄기</a></li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>