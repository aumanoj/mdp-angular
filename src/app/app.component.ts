import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeData } from './components/me/me.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ScrollTopServiceService } from './scroll-top-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


declare var config: any;
declare  var jQuery:  any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'loginRegisterJWT';
   user: any;
  showMsg: boolean;
  constructor(private router: Router, private auth: AuthService,private scrollTopServiceService: ScrollTopServiceService,private ngxLoader: NgxUiLoaderService,private http: HttpClient,public translate: TranslateService) {

    window.addEventListener("online", () => {
      this.showMsg=true;
      Swal.fire({ 
        text: 'Internet Connected!',
        icon: 'success',
        timer:1000,
        showCancelButton: false,
        showConfirmButton: false,  
      })
    });

    window.addEventListener("offline", () => {
      this.showMsg=false;
      Swal.fire({ 
          text: 'Please check your internet connection!',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'Ok',
          
        })
    });

    this.auth.userVar$.subscribe((data: MeData) => {
      if (data !== null && data !== undefined) {
        //console.log(data);
        this.user = data;
      }
    });

    /* dynamic translation */
    translate.addLangs(['english', 'french']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/english|french/) ? browserLang : 'english');  
    } else {  
      localStorage.setItem('locale', 'english');  
      translate.setDefaultLang('english');  
    }  

  }
   
   changeLang(language: string) {  
    localStorage.setItem('locale', language);   
    this.translate.use(language);  
   }  

  

  ngOnInit() {

    
    this.scrollTopServiceService.setScrollTop();
    
    this.ngxLoader.start();
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stop();
    });

      this.scrollTopServiceService.setScrollTop();

      (function ($) {

       $(document).ready(function(){
          $('#dashboardinid').trigger('click');
        }); 

    })(jQuery)

    // Tenemos token
    this.auth.start();     
      

(function ($) {

    'use strict';

    function initSlimscroll() {
        $('.slimscroll').slimscroll({
            height: 'auto',
            position: 'right',
            size: "7px",
            color: '#e0e5f1',
            opacity: 1,
            wheelStep: 5,
            touchScrollStep: 50
        });
    }

   
    function initMetisMenu() {
        //metis menu
        $("#main_menu_side_nav").metisMenu();
    }

    function initLeftMenuCollapse() {
        // Left menu collapse
        $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            $("body").toggleClass("enlarge-menu");
            initSlimscroll();
        });
    }

    function initEnlarge() {
        if ($(window).width() < 1025) {
            $('body').addClass('enlarge-menu');
        } else {
            if ($('body').data('keep-enlarged') != true)
                $('body').removeClass('enlarge-menu');
        }
    }

   

    function initSerach() {
        $('.search-btn').on('click', function () {
            var targetId = $(this).data('target');
            var $searchBar;
            if (targetId) {
                $searchBar = $(targetId);
                $searchBar.toggleClass('open');
            }
        });
    }


    function initMainIconMenu() {
        $('.main-icon-menu .nav-link').on('click', function(e){
            e.preventDefault();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.main-menu-inner').addClass('active');
            var targ = $(this).attr('href');
            $(targ).addClass('active');
            $(targ).siblings().removeClass('active');
        });
    }

    function initTooltipPlugin(){
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="tooltip-custom"]').tooltip({
            template: '<div class="tooltip tooltip-custom" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }
    

    function initActiveMenu() {
        // === following js will activate the menu in left side bar based on url ====
        $(".left-sidenav a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().parent().addClass("in");
                $(this).parent().parent().addClass("mm-show");
                $(this).parent().parent().prev().addClass("active");
                $(this).parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().addClass("mm-active");
                $(this).parent().parent().parent().parent().addClass("in");  
                $(this).parent().parent().parent().parent().parent().addClass("active");  
                $(this).parent().parent().parent().parent().parent().parent().addClass("active");              
                var menu =  $(this).closest('.main-icon-menu-pane').attr('id');
                $("a[href='#"+menu+"']").addClass('active');
                
            }
        });
    }

    

    function init() {
        initSlimscroll();
        initMetisMenu();
        initLeftMenuCollapse();
        initEnlarge();
        initSerach();
        initMainIconMenu();
        initTooltipPlugin();
        initActiveMenu();
       // Waves.init();
    }

    init();

})(jQuery)



  }
  logout() {
    this.auth.logout();
  }

  

}


