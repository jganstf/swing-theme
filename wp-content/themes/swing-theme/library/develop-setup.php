<?php

//delete default sample page and post
// set home and news page

function insert_pages() {

}

// generate generics testing
function generate_generic_page() {
   $sample = get_page_by_title('Sample Page');
   wp_update_post([
      ID => $sample->ID,
      post_status => 'draft',
      post_title => 'Generic',
      post_content => '<!-- wp:paragraph {"key": "value"} --> <p>Welcome to the world of blocks.</p> <!-- /wp:paragraph -->'
   ]);
}

function setupMainNavigation() {

}

function setup() {

   // $setupDaat = wp_json_file_decode( 'setup.json', ['associative' => false ] );

   // create_templates();
   $file = 'templates/portfolio.php';
   if(!copy('page.php', $file)) {
      //seek add template name - https://stackoverflow.com/questions/3004041/how-to-replace-a-particular-line-in-a-text-file-using-php
      error_log("failed to copy $file...\n");//debug
   }

   insert_pages();

   // wp_trash_posts();

   //set home page
   if ( $home = get_page_by_title( 'Front Page' ))
   {
      update_option( 'page_on_front', $home->ID );
      update_option( 'show_on_front', 'page' );
   }
   if ( $news_blog = get_page_by_title( 'News' )?:get_page_by_title( 'Blog' ))
   {
      // Set the blog page
      $blog   = get_page_by_title( 'Blog' );
      update_option( 'page_for_posts', $blog->ID );   
   }
}

// Rest api stuff - TODO nonce
add_action('rest_api_init', function () {
	$namespace = 'dev/v1';
	register_rest_route( $namespace, '/generic', array(
		'methods'  => 'GET',
		'callback' => 'generate_generic_page',
		'permission_callback' => function( WP_REST_Request $request ) {
			return current_user_can( 'manage_options' );
		},
	));
	register_rest_route( $namespace, '/setup', array(
		'methods'  => 'GET',
		'callback' => 'insert_temporary_team',
		'permission_callback' => function( WP_REST_Request $request ) {
			return current_user_can( 'manage_options' );
		},
	));
});


function insert_temporary_team() {
   foreach([
      ["Paul Desmarais III", "Partner"],
      ["Adam Felesky", "Partner"],
      ["Samuel Robinson", "President"],
      ["Stephanie Choo", "Partner"],
      ["Hélène Falchier", "Partner"],
      ["Ricky Lai", "Partner"],
      ["Ben Harrison", "Partner, Head of Partnerships & Policy"],
      ["Nick Hungerford", "Venture Partner"],
      ["Jonathan Tétrault", "Managing Partner, Sagard"],
      ["Adam Vigna", "Chief Investment Officer, Sagard"],
      ["Sacha Haque", "Partner, General Counsel & Secretary"],
      ["Leslie Hill", "Partner, Investor Relations"],
      ["Stephan Klee", "Chief Financial Officer"],
      ["François Lafortune", "Partner, CEO of Diagram"],
      ["Robin Tessier", "Partner and Head of Canada Products and Solutions"],
      ["Amanda Gaiotti", "Senior Principal, Value Creation"],
      ["Joseph Lau", "Chief Information Security Officer"],
      ["Jonathan Metrick", "Chief Growth Officer"],
      ["Johnita W. Mizelle", "Senior Principal, US Distribution"],
      ["Amer Javed", "Vice-President of Finance"],
      ["Bart Dziarski", "Director of Corporate Finance, Planning & Analysis (FP&A)"],
      ["Joanie Bérard", "Director of Fund Accounting"],
      ["Maxime Desrochers", "Director of Fund Accounting"],
      ["Ian Sherman", "Director of Growth and Value Creation"],
      ["Leslie Rivers", "Director, People & Culture"],
      ["Junaid Subhan", "Vice-President, Legal Affairs and Chief Compliance Officer"],
      ["Dominique Perron", "Vice-President, Legal Affairs and Assistant Secretary"],
      ["Carina Doshi", "Chief of Staff"],
      ["Jake Bodanis", "Principal"],
      ["Robert Hamlin", "Principal"],
      ["Sinath Kim", "Principal, Partnerships & Policy"],
      ["Mrinay Nair", "Principal, Partnerships and Policy"],
      ["Juliette Souliman", "Principal"],
      ["Brendan Callaghan", "Head of Enterprise Sales"],
      ["Smriti Dhawan", "Senior Manager, Accounting Policy and Advisory"],
      ["Yannick Malabar", "Manager, Fund Accounting"],
      ["Eliza Pong", "Manager, Fund Accounting"],
      ["Gisele Karekezi", "Communications Manager"],
      ["Mickias Hailu", "Associate"],
      ["Victoire de Lavigne", "Associate"],
      ["Grégoire Viat", "Associate"],
      ["Philippe Gauron", "Associate, Corporate Finance, Planning and Analysis (FP&A)"],
      ["Carl Qiu", "Associate, Partnerships and Policy"],
      ["Jessica Viscosi", "Associate, Corporate Development"],
      ["Ahmed Syed", "Associate, Investor Relations"],
      ["Charlene Li", "Fund Accountant"],
      ["James Crocker", "Data Engineer"],
      ["Robert Gold", "Compliance Associate"],
      ["Antoinette Marrone", "Director of Paralegal Services"],
      ["Sneha Jena", "Senior Corporate Accountant"],
      ["Kathy Menis", "Corporate Accountant"],
      ["Ivan Koparan", "Senior Research Associate"],
      ["Leo Liu", "Analyst"],
      ["Kim Carrière", "HR Generalist"],
      ["Magalie Aza", "Executive Assistant & Legal Team Coordinator"],
      ["Ramla Chergui", "Executive Assistant"],
      ["Marcia Rodrigues", "Executive Assistant"],
      ["Cecilia Tong", "Executive Assistant"],
      ["Suong Tran", "Executive Assistant"],
      ["Rim Hamdan", "Administrative Receptionist"],
      ["Ron Close", "Leadership Advisor"],
      ["Hugues Le Bret", "Advisor"],
      ["Gregory Fleming", "Advisor"],
      ["Jamess Forrest", "Advisor"],
      ["Kris Hansen", "Advisor"],
      ["Peter Hancock", "Advisor"],
      ["Asiff Hirji", "Advisor"],
      ["Ron Hirson", "Advisor"],
      ["Marshall Lux", "Advisor"],
      ["Sharon MacLeod", "Advisor"],
      ["Chris O'Neill", "Advisor"],
      ["Dr. Richard Reiner", "Advisor"]
  ] as $t) {
      wp_insert_post([
         'post_type' => 'team',
         'post_status' => 'publish',
         'post_title' => $t[0],
         'meta_input' => [
            'position' => $t[1],
         ]
      ]);
   }
}



// $options = get_fields('options'); 
// $projects = get_posts([
//    'post_status' => 'publish',
//    'post_type' => 'projects',
//    'posts_per_page' => -1,
// ]);
// if(!count($projects)) {
//    foreach([
//       'Acheel', 'Alan', 'Albert', 'Alpaca', 'Atomic',
//       'Boosted.ai', 'Borrowell',
//       'Clark', 'ClearBanc', 'Collage', 'Conquest',
//       'Digit', 'Dialogue', 'Drop',
//       'Flybits', 'Fondeadora',
//       'Hellas Direct',
//       'integrate.ai', 'Intropic',
//       'Kikoff', 'Kin.', 'Koho',
//       'League', 'Limelight Health',
//       'Magnifi', 'Multiply',
//       'Neat', 'Nesto',
//       'Planto', 'Pledg',
//       'Qover', 'Quovo',
//       'Retirable',
//       'Street Context', 'Stride Health', 'Synctera',
//       'Wave', 'Wealthsimple',
//       'Zensurance',
//    ] as $p) {
//       if(!count(get_post([
//          'post_title' => $p
//       ])))
//       error_log(json_encode('inserting', JSON_PRETTY_PRINT));//debug
//       wp_insert_post([
//          'post_title' => $p,
//          'post_type' => 'projects',
//          'post_status' => 'publish',
//       ]);
//    }
// } else {}
// $projects = get_posts([
//    'post_status' => 'publish',
//    'post_type' => 'projects',
//    'posts_per_page' => -1,
// ]);



// 'Acheel',  'https://alan.eu/'
// 'Alan',  ' https://albert.com/'
// 'Albert',  ''
// 'Alpaca',  ''
// 'Atomic', ''
// 'Boosted.ai',  ''
// 'Borrowell', ''
// 'Clark',  ''
// 'ClearBanc',  ''
// 'Collage',  ''
// 'Conquest', ''
// 'Digit',  ''
// 'Dialogue',  ''
// 'Drop', ''
// 'Flybits',  ''
// 'Fondeadora', ''
// 'Hellas Direct', ''
// 'integrate.ai',  ''
// 'Intropic', ''
// 'Kikoff',  ''
// 'Kin.',  ''
// 'Koho', ''
// 'League',  ''
// 'Limelight Health', ''
// 'Magnifi',  ''
// 'Multiply', ''
// 'Neat',  ''
// 'Nesto', ''
// 'Planto',  ''
// 'Pledg', ''
// 'Qover',  ''
// 'Quovo', ''
// 'Retirable', ''
// 'Street Context',  ''
// 'Stride Health',  ''
// 'Synctera', ''
// 'Wave',  ''
// 'Wealthsimple', ''
// 'Zensurance', ''
// https://alan.eu/
// https://albert.com/
// https://alpaca.markets/
// https://atomic.financial/
// https://boosted.ai/
// https://borrowell.com/
// https://www.clark.de/
// https://clearbanc.com/
// https://collage.co/
// https://conquestplanning.com/
// https://www.conduit.financial/
// http://www.d1g1t.com/
// https://dialogue.co/
// https://www.earnwithdrop.com/
// https://www.flybits.com/
// https://fondeadora.com/
// https://haruko.io/
// https://www.hellasdirect.gr/
// https://www.integrate.ai/
// https://intropic.io/
// https://www.kikoff.com/
// https://www.kin.com/
// https://www.koho.ca/
// https://www.league.com/
// https://www.limelighthealth.com/
// https://www.loan-street.com/
// https://www.heymirza.com/
// http://multiply.ai/
// https://www.neat.hk/
// https://www.nesto.ca/
// https://www.planto.hk/
// https://www.pledg.co/
// https://www.qover.com/
// https://techcrunch.com/2019/01/08/plaid-snags-quovo-to-build-full-service-financial-api-offering/
// https://www.quovo.com/
// https://retirable.com/
// https://www.socotra.com/
// http://streetcontxt.com/
// https://www.stridehealth.com/
// https://synctera.com/
// https://www.tuumplatform.com/
// https://www.theglobeandmail.com/business/article-torontos-wave-financial-purchased-by-hr-block-for-536-million/
// https://www.waveapps.com/
// http://www.wealthsimple.com/
// https://betakit.com/us-insurance-giant-travelers-acquires-majority-stake-in-zensurance/
// http://www.zensurance.ca/
// http://www.arborventures.com/
// http://diagram.ca/
// http://deciens.com/
// https://electriccapital.com/
// http://www.fintech.io/
// http://informationvp.com/
// https://lafamiglia.vc/
// https://multicoin.capital/
// http://www.nycapartners.com/
// http://realventures.com/
// http://www.socialleverage.com/
// https://whitestarvc.com/
// https://www.creativedestructionlab.com/
// https://portagevc.com/terms-and-conditions/
// https://portagevc.com/privacy-policy/