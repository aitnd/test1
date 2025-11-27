<!-- BEGIN: main -->
<!-- BEGIN: loop -->
<table class="table-list-news">
	<tbody>
		<!-- BEGIN: cattitle -->
		<tr>
			<th colspan="2">
				<a title="{CAT.title}" href="{CAT.link}">{CAT.title}</a>
			</th>
		</tr>		
		<!-- END: cattitle -->
		<!-- BEGIN: viewcatloop -->
		<tr>
			<td>
				{NUMBER}
			</td>
			<td>
				<a target="_blank" title="{CONTENT.title}" href="{CONTENT.link}">{CONTENT.title}</a>                      
			</td>
		</tr>
		<!-- END: viewcatloop -->
	</tbody>
</table>
<!-- END: loop -->
<!-- END: main -->