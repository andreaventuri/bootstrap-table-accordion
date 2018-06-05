(function ( $ ) {

	$.fn.tableAccordion = function( options ) {

		var mainObj = this;
		var requestRunning = false;

		//console.log('001 - '+requestRunning);

		// This is the easiest way to have default options
		var settings = $.extend({
			// These are the defaults.
			url: '',
			id: '.td_id',
			tbl_class: 'tableAccordion',
			cache: true,
			success: function(){}
		}, options );

		mainObj.find('thead tr').each(function(){

			$(this).prepend('<th></th>');
		});

		mainObj.find('tbody tr').each(function(){

			$(this).prepend('<td style="font-size:14px"><a href="#"><i class="far fa-plus-square"></i></a></td>');
		});

		mainObj.find('td a').click(function(){

			//console.log('100 - '+requestRunning);

			if(requestRunning) return;

			requestRunning = true;

			//console.log('200');

			var linkObj = $(this);

			if( linkObj.data('open') )
			{
				//console.log('300');

				linkObj.find('i').removeClass('fa-minus-square').addClass('fa-plus-square');

				linkObj.parents('tr').next('tr').find('div').slideUp(500, function(){

					if(settings.cache)
					{
						$(this).parents('tr').hide();

						//console.log('310');
					}
					else
					{
						$(this).parents('tr').remove();

						//console.log('320');
					}

					requestRunning = false;

					//console.log('330 - '+requestRunning);
				});

				//console.log('340');

				linkObj.data('open',false);
			}
			else
			{
				//console.log('400');

				// esamino la riga successiva
				row = $(this).parents('tr').next();

				if( settings.cache && row.length>0 && !row.is(':visible') )
				{
					row.show();
					row.find('div').slideDown(500);

					linkObj.find('i').removeClass('fa-plus-square').addClass('fa-minus-square');
					linkObj.data('open',true);

					requestRunning = false;

					//console.log('410');
				}
				else
				{
					//console.log('420');

					$.ajax({
						url: settings.url,
						dataType: 'json',
						data: {
							id: $(this).parents('tr').find(settings.id).text()
						},
						beforeSend: function(){

							linkObj.find('i').removeClass('fa-plus-square').addClass('fas fa-spinner fa-spin');
						},
						success: function(data) {

							// costruzione tabella
							var tbl_id = 'innerTable' + (Math.floor(Math.random() * 10000) + 1);
							var tbl = '<table class="table table-bordered '+settings.tbl_class+'" id="'+tbl_id+'">';

							$.each(data, function(i, row){

								if(i==0)
								{
									tbl += '<thead>';

									$.each(row, function(k, v){

										tbl += '<th>'+v+'</th>';
									});

									tbl += '</thead>';
								}
								else
								{
									tbl += '<tbody>';

									$.each(row, function(k, v){

											tbl += '<td class="td_'+k+'">'+v+'</td>';
									});

									tbl += '</tbody>';
								}
							});

							tbl += '</table>';
							// fine costruzione tabella

							var quanti = linkObj.parents('tr').find('td').length-1;

							var row = $('<tr><td></td><td colspan="'+quanti+'"><div class="col-sm-12" style="display:none">'+tbl+'</div></td></tr>');

							row.insertAfter( linkObj.parents('tr') );
							row.find('div').slideDown(500);

							linkObj.find('i').removeClass('fas fa-spinner fa-spin').addClass('fa-minus-square');

							linkObj.data('open',true);

							requestRunning = false;

							settings.success( $('#'+tbl_id) );
						}
					});

					//console.log('430');
				}
			}

			return false;
		});
	};

}( jQuery ));


























