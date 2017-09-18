/* global app:true */

(function() {
  'use strict';

  app = app || {};

  /////////////////////////////////////////////////////////////
  //*************        MODELS      ************************//
  /////////////////////////////////////////////////////////////

  app.Login = Backbone.Model.extend({
    url: '/api/v1/login/',
    defaults: {
      errors: [],
      errfor: {},
      username: '',
      password: ''
    }
  });

  app.Signup = Backbone.Model.extend({
    url: '/api/v1/signup/',
    defaults: {
      errors: [],
      errfor: {},
      username: '',
      email: '',
      password: '',
      roles: ''
    }
  });

  app.User = Backbone.Model.extend({
    url: '/api/v1/user/',
    defaults: {
      errors: [],
      errfor: {},
      id: '',
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      isActive: '',
      isVerified: '',
      roles: '',
      groups: '',
      phone: '',
      twitterKey: '',
      facebookKey: '',
      googleKey: '',
      githubKey: '',
      createdById: ''
    }
  });

  app.Record = Backbone.Model.extend({
    //idAttribute: 'id',
    defaults: {
      id: undefined,
      grape: '',
      estate: '',
      name: '',
      notes: '',
      rating: '',
      createdById: ''
    },
    url: function() {
      return '/api/v1/cellar/'+ (this.isNew() ? '' : this.id +'/');
    }
  });

  app.RecordCollection = Backbone.Collection.extend({
    model: app.Record,
    url: '/api/v1/cellar/'
  });

  app.UserRecord = Backbone.Model.extend({
    defaults: {
      id: undefined,
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      isActive: '',
      isVerified: '',
      roles: '',
      groups: '',
      phone: '',
      twitterKey: '',
      facebookKey: '',
      googleKey: '',
      githubKey: '',
      createdById: ''
    },
    url: function() {
      return '/api/v1/admin/users/'+ (this.isNew() ? '' : this.id +'/');
    }
  });

  app.UserCollection = Backbone.Collection.extend({
    model: app.UserRecord,
    url: '/api/v1/admin/users/'
  });

  /////////////////////////////////////////////////////////////
  //*************        CELLAR      ************************//
  /////////////////////////////////////////////////////////////

  app.CellarView = Backbone.View.extend({
    el: '#cellar',
    template: _.template(JST["assets/views/cellar/tmpl-cellar.html"]()), //We need to jade this and pass data
    initialize: function() {
      console.log('cellarView loaded.');
      
      this.render();
  
    },
    render: function() {

      console.log('cellarView: render');


      this.$el.html(this.template( 'hello' ));

      return this;
    }
  });

  app.MyCellarView = Backbone.View.extend({
    el: '#cellar',
    template: _.template(JST["assets/views/cellar/tmpl-cellar.html"]()), //We need to jade this and pass data
    events: {
      'click #add-wine': 'addWine',
      'click #submit-wine': 'submitWine',
      'click #cancel-wine': 'cancelWine',
      'click .delete-wine': 'deleteWine'
    },
    initialize: function() {
      console.log('mycellarView loaded.');
      var self = this;

      this.collection = new app.RecordCollection( );
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.collection.fetch({
        success: function(collection, response, options){
          //console.log('collection, response, options');
          console.dir(collection);
          console.dir(response);
          //console.dir(options);
          app.views.profileView = new app.ProfileView();

          if(typeof app.views.adminView == 'undefined'){
      
            if(app.user.attributes.roles.indexOf('0,') != -1){
              app.views.adminView = new app.AdminView();
            }
          }

          self.render();
        }
      });

    },
    render: function() {

      //fetch my collection from server
      console.log('mycellarView: render');
      console.log(this.collection.length);

      //console.dir(app.user.attributes);

      this.$el.html(this.template());

      //Add + button
      //$('#cellar .btn-group').append('<button id="add-wine" class="btn btn-default btn-sm" data-toggle="modal" data-target="#wine-modal" data-backdrop="false"><span class="fa fa-plus"></span></button>');
      $('#cellar .btn-group').append('<button id="add-wine" class="btn btn-default btn-sm" data-backdrop="false"><span class="fa fa-plus"></span></button>');
      //Add the delete heading
      $('#cellar .table thead tr').prepend('<th><span class="fa fa-trash-o"></span></th>');

      //remove Sid's top 20 records
      $('#results-rows').empty();

      if(this.collection.length == 0){
        console.log('We need to add the dummy item');
        $('#results-rows').append('<tr><td>Chardonnay</td><td>Heemskerk</td><td>2012 Coal River Valley Chardonnay</td><td>Bright straw-green; French oak barrel fermented, and pure class from start to finish, with perfect balance, line and length; Tasmanian acidity provides the framework and the length of a delicious wine. Trophy Best Chardonnay Tasmanian Wine Show ’14.</td><td>9.8</td></tr>');
      }

      var welcomeText = 'Welcome, ' + app.user.attributes.username;
      var cellarBlurb1 = 'This is your wine cellar, why don\'t you start adding your favourite drops! Look, I\'ve started you off with one of my personal favourites.';
      var cellarBlurb2 = 'Excellent, I see you have great taste in wine! Keep building your cellar!';
      var cellarBlurb3 = 'This is quite the collection you have! You\'ll need to stop there or you risk overshadowing me!!';
      var panelHeading = '<img class="wines" src="media/wines.png" /> ' + app.user.attributes.username + '\'s Top 20';
      
      $('#cellar div.media-body h4.media-heading').html(welcomeText);
      if (this.collection.length == 0){
        $('#cellar div.media-body p.cellarConversation').text(cellarBlurb1);
      } else if (this.collection.length < 20){
        $('#cellar div.media-body p.cellarConversation').text(cellarBlurb2);
      } else if (this.collection.length == 20){
        $('#cellar div.media-body p.cellarConversation').text(cellarBlurb3);
      }
      $('#cellar div.panel-heading h3.panel-title').html(panelHeading);

      var frag = document.createDocumentFragment();
      console.log('reached wine record creation');
      this.collection.each(function(record) {
        console.log('Wine name is: ' + record.attributes.name);
        var view = new app.ResultsRowView({ model: record });
        frag.appendChild(view.render().el);
      }, this);
      $('#results-rows').append(frag);

      return this;
    },
    addWine: function(e){
      e.preventDefault();
      console.log('add wine');
      
      //show form - only add 100 wines
      if(this.collection.length < 101){
        app.views.detailsView.doShowDetails();
      }
    },
    deleteWine: function(e){
      console.log('delete wine');
      console.dir($(e.currentTarget).closest('tr'));
      var self = this;
      var siblings = $(e.currentTarget).closest('tr').children();

      console.log('wineName: ');
        console.dir(siblings[3]);

      //parent tr remove, fadeOut
      var removeWine = this.collection.findWhere({
        name: siblings[3].innerText
      });
      console.log('removeWine: ')
      console.dir(removeWine);

      removeWine.destroy().complete(function(){
          self.collection.fetch();
        });

      //this.collection.remove(removeWine);
    }
  });

  app.ResultsRowView = Backbone.View.extend({
    tagName: 'tr',
    //template: _.template(JST["assets/views/cellar/wines/tmpl-wines.html"]()),
    events: {
      'click td.name': 'viewDetails'
    },
    viewDetails: function() {
      //location.href = this.model.url();
      app.views.detailsView.doShowDetails(this.model);
    },
    render: function() {
      console.log('ResultsRowView: render');
      console.dir(this.model.attributes);

      //this.$el.html(this.template( this.model ));
      this.$el.html(_.template(JST["assets/views/cellar/wines/tmpl-wines.html"](this.model)));

      return this;
    }
  });

  app.DetailsRowView = Backbone.View.extend({
    el: '#item-details',
    //model: new app.Record(),
    template: _.template(JST["assets/views/cellar/wines/tmpl-wine-details.html"]()),
    events: {
      'click #cancel': 'doCancelButton',
      'click #save': 'doSaveButton'
    },
    initialize: function() {
      console.log('detailsView loaded.');
      this.render();
    },
    render: function() {
      console.log('DetailsRowView: render');
      this.$el.html(this.template());
      
      return this;
    },
    doShowDetails: function(model){
      console.log('doShowView: ');
      if(model != undefined){
        //existing wine clicked from list
        console.dir(model);        
        $('#wineID').val(model.attributes.id);
        $('#wineGrape').val(model.attributes.grape);
        $('#wineEstate').val(model.attributes.estate);
        $('#wineName').val(model.attributes.name);
        $('#wineNotes').val(model.attributes.notes);
        $('#wineRating').val(model.attributes.rating);
      } else {
        //new entry
        console.log('no model');
      }

      app.showView(app.views.detailsView);

    },
    doSaveButton: function() {
      var data = [];
      console.log('Save clicked, new data: ');
      //do something then return
      $.each($('#add-edit-wine :input'), function(i, item) {
        data[item.id] = item.value;
      });

      //save the data
      if(data.wineID){
        console.log('existing wine updated, id:' + data.wineID);

        //update existing wine - find model and update it?
        //app.views.mycellarView
        app.views.mycellarView.collection.each(function(record) {
        console.log('Wine id is: ' + record.attributes.id);
        if(record.attributes.id == data.wineID) {
          console.log('match found: ' + data.wineID);
          //console.dir(data);
          
          record.save({
            grape: data.wineGrape,
            estate: data.wineEstate,
            name: data.wineName,
            notes: data.wineNotes,
            rating: data.wineRating
            //createdById: app.user.attributes.id,
            //createdByName: app.user.attributes.username
          }, {
            success: function (model, response) {
              console.log("success");
              console.dir(model);
             
              app.views.mycellarView.collection.fetch(); 
              app.views.mycellarView.render(); 
              //this doesnt work it needs to re-render the model update in myCellar

              app.showView(app.views.mycellarView);
            },
            error: function (model, response) {
                console.log("error");
            }
          });

        }
        
      }, app.views.mycellarView);

        app.showView(app.views.mycellarView);

      } else {
        console.log('new wine added');

        var newWine = new app.Record();

        newWine.save({
          grape: this.$el.find('#add-edit-wine #wineGrape').val(),
          estate: this.$el.find('#add-edit-wine #wineEstate').val(),
          name: this.$el.find('#add-edit-wine #wineName').val(),
          notes: this.$el.find('#add-edit-wine #wineNotes').val(),
          rating: this.$el.find('#add-edit-wine #wineRating').val(),
          createdById: app.user.attributes.id,
          createdByName: app.user.attributes.username
        }, {
          success: function (model, response) {
            console.log("success");
            //console.dir(model);
            //$('#wine-modal').modal('hide');
            app.views.mycellarView.collection.add(model);

            app.showView(app.views.mycellarView);
          },
          error: function (model, response) {
              console.log("error");
          }
        });

      }

    },
    doCancelButton: function() {
      console.log('Cancel clicked');
      console.dir(this.model);
      app.showView(app.views.mycellarView);
    }
  });

  /////////////////////////////////////////////////////////////
  //*************       HEAD/HOME    ************************//
  /////////////////////////////////////////////////////////////

  app.HeaderView = Backbone.View.extend({
    el: '#header', 
    template: _.template(JST["assets/views/header/tmpl-header.html"]()), //We need to jade this and pass data
    events: {
      'click #gotoHome': 'processHome',
      'click #gotoAbout': 'processAbout',
      'click #gotoCellar': 'processCellar',
      'click #doSignIn': 'doSignIn',
      'click #doSignUp': 'doSignUp',
      'click #doCancelSignUp': 'doCancelSignUp',
      'click #social-signup-buttons a': 'doSocialSignUp',
      'click #gotoForgot': 'processForgot',
      'click #gotoReset': 'processReset',
      'click #bprofile': 'showProfile',
      'click #badmin': 'showAdmin'
    },
    initialize: function() {
      console.log('headerView loaded.');
      //this.model = new app.Record();
      //this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    render: function() {
      this.$el.html(this.template( 'hello' ));
      return this;
    },
    processHome: function(e){
      e.preventDefault();
      console.log('view: #gotoHome clicked');

      $('#public-menu').children().removeClass('active');
      app.showView(app.views.homeView);
    },
    processAbout: function(e){
      e.preventDefault();
      console.log('view: #gotoAbout clicked');

      $('#public-menu > li.active').removeClass('active');
      app.showView(app.views.aboutView);
      $('#gotoAbout').parent().addClass('active');
    },
    processCellar: function(e){
      e.preventDefault();
      console.log('view: #gotoCellar clicked');

      $('#public-menu > li.active').removeClass('active');
      app.showView(app.views.cellarView);
      $('#gotoCellar').parent().addClass('active');
    },
    doSignIn: function(e){
      e.preventDefault();
      console.log('view: #doSignIn clicked');
      //app.showView(app.views.cellarView);

      $('#signStatus').css("display", "inline");
      $('#signAlert').html('');

      //
      $('#signinupDropdown').attr('disabled', true);
      $('.dropdown-menu').attr('disabled', true);
      $('.form-control').attr('disabled', true);
      $('#doSignIn').attr('disabled', true);
      $('#doSignUp').attr('disabled', true);


      app.login = new app.Login();

      app.login.save({
        username: $('#inputUsername').val(),
        password: $('#inputPassword').val()
      },{
        success: function(model, response) {
          if (response.success) {
            console.log('Signed In!');
            //console.dir(model);
            //console.dir(response);

            app.user.attributes.username = response.username;
            app.user.attributes.id = response.userid;
            app.user.attributes.roles = response.roles;
            app.user.attributes.firstname = response.firstname;
            app.user.attributes.lastname = response.lastname;
            app.user.attributes.isActive = response.isActive;
            app.user.attributes.isVerified = response.isVerified;
            app.user.attributes.groups = response.groups;
            app.user.attributes.phone = response.phone;
            app.user.attributes.twitterKey = response.twitterKey;
            app.user.attributes.facebookKey = response.facebookKey;
            app.user.attributes.googleKey = response.googleKey;
            app.user.attributes.githubKey = response.githubKey;
            app.user.attributes.createdById = response.createdById;  

            app.finishSignIn();
          
          }
          else {
            model.set(response);
            var alertStr = '<div class="alert alert-danger" role="alert">' + response.errors + '</div>';
            console.log('Fail!');
            $('.form-control').attr('disabled', false);
            $('#doSignIn').attr('disabled', false);
            $('#doSignUp').attr('disabled', false);
            $('#signinupDropdown').attr('disabled', false);
            $('.dropdown-menu').attr('disabled', false);
            $('#signStatus').css("display", "none");
            $('#signAlert').html(alertStr);
          }
        }
      });


    },
    doSignUp: function(e){
      e.preventDefault();
      console.log('view: #doSignUp clicked');

      $('#signStatus').css("display", "inline");
      $('#signAlert').html('');

      $('#signinupDropdown').attr('disabled', true);
      $('.dropdown-menu').attr('disabled', true);
      $('.form-control').attr('disabled', true);
      $('#doSignIn').attr('disabled', true);


        //console.log('email field was showing so sign up will proceed');
        $('#inputEmail').attr('disabled', true);
        $('#doSignUp').attr('disabled', true);
        $('#doCancelSignUp').attr('disabled', true);

        app.signup = new app.Signup();

        app.signup.save({
          username: $('#inputUsername').val(),
          password: $('#inputPassword').val(),
          email: $('#inputEmail').val(),
          roles: "1,"
        },{
          success: function(model, response) {
            if (response.success) {
              console.log('Signed Up!!!');

              app.user = new app.User();
              app.user.attributes.username = response.username;
              app.user.attributes.id = response.userid;
              app.user.attributes.roles = response.roles;
              app.user.attributes.firstname = response.firstname;
              app.user.attributes.lastname = response.lastname;

              app.finishSignIn();

            } else {
              model.set(response);
              var alertStr = '<div class="alert alert-danger" role="alert">' + response.errors + '</div>';
              console.log('Fail!');
              $('.form-control').attr('disabled', false);
              $('#doSignIn').attr('disabled', false);
              $('#doSignUp').attr('disabled', false);
              $('#signinupDropdown').attr('disabled', false);
              $('.dropdown-menu').attr('disabled', false);
              $('#signStatus').css("display", "none");
              $('#signAlert').html(alertStr);
            }
          }

        });
     

    },
    doCancelSignUp: function(e){
      console.log('signup cancelled');

      $('.form-control').attr('disabled', false);
      $('#doSignIn').attr('disabled', false);
      $('#doSignUp').attr('disabled', false);
      $('#signinupDropdown').attr('disabled', false);
      $('.dropdown-menu').attr('disabled', false);
      $('#signStatus').css("display", "none");

      $('.dropdown-toggle').dropdown('toggle');

    }/*,  Social Not Working
    doSocialSignUp: function(e){
      e.preventDefault();
      console.log('view: social signup clicked - ' + e.currentTarget.id);
      console.log($('#inputEmail').val());

      if (e.currentTarget.id == "facebook"){
        $.ajax({
          method: "GET",
          url:  "http://" + window.location.host + "/api/v1/signup/facebook/",
          data: { email: $('#inputEmail').val(),
                  username: $('#inputUsername').val(),
                  password: $('#inputPassword').val() }
        })
          .done(function( msg ) {
            console.dir( msg );
            app.finishSignIn();
          });
      } else if (e.currentTarget.id == "twitter") {
        $.ajax({
          method: "POST",
          url:  "http://" + window.location.host + "/api/v1/signup/twitter/",
          data: { email: $('#inputEmail').val(),
                  username: $('#inputUsername').val(),
                  password: $('#inputPassword').val() }
        })
          .done(function( msg ) {
            console.dir( msg );
            app.finishSignIn();
          });
      } else if (e.currentTarget.id == "google") {
        $.ajax({
          method: "POST",
          url:  "http://" + window.location.host + "/api/v1/signup/google/",
          data: { email: $('#inputEmail').val(),
                  username: $('#inputUsername').val(),
                  password: $('#inputPassword').val() }
        })
          .done(function( msg ) {
            console.dir( msg );
            app.finishSignIn();
          });
      } else if (e.currentTarget.id == "github") {
        $.ajax({
          method: "POST",
          url:  "http://" + window.location.host + "/api/v1/signup/github/",
          data: { email: $('#inputEmail').val(),
                  username: $('#inputUsername').val(),
                  password: $('#inputPassword').val() }
        })
          .done(function( msg ) {
            console.dir( msg );
            app.finishSignIn();
          });
      } else {
        //nothing
      }


    }*/,
    processForgot: function(e){
      e.preventDefault();
      console.log('view: #gotoForgot clicked');

      $('#public-menu').children().removeClass('active');
      app.showView(app.views.forgotView);
    },
    processReset: function(e){
      e.preventDefault();
      console.log('view: #gotoReset clicked');

      $('#public-menu').children().removeClass('active');
      app.showView(app.views.resetView);
    },
    showProfile: function(e){
      console.log('view: #bprofile clicked');
      console.dir(app.views.profileView);
      $('#public-menu').children().removeClass('active');
      app.showView(app.views.profileView);
    },
    showAdmin: function(e){
      console.log('view: #badmin clicked');
      console.dir(app.views.adminView);
      $('#public-menu').children().removeClass('active');
      app.showView(app.views.adminView);
    }
  }); 

  app.HomeView = Backbone.View.extend({
    el: '#home',
    //template: _.template(JST["assets/views/home/tmpl-home.html"]()), //We need to jade this and pass data
    template: _.template(JST["assets/views/home/tmpl-home.html"]()),
    initialize: function() {
      console.log('homeView loaded.');
      //this.model = new app.Record();
      //this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    render: function() {
      this.$el.html(this.template( 'hello' ));
      return this;
    }
  });

  app.AboutView = Backbone.View.extend({
    el: '#about',
    template: _.template(JST["assets/views/about/tmpl-about.html"]()), //We need to jade this and pass data
    initialize: function() {
      console.log('aboutView loaded.');
      //this.model = new app.Record();
      //this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    render: function() {
      this.$el.html(this.template( 'hello' ));
      return this;
    }
  });

  /////////////////////////////////////////////////////////////
  //*************        PROFILE     ************************//
  /////////////////////////////////////////////////////////////

  app.ProfileView = Backbone.View.extend({
    el: '#profile',
    //template loaded during render
    events: {
      'click #profile-settings': 'doProfileSettings',
      'click #submit-profile': 'doSubmitProfileChanges'
    },
    initialize: function(){

      console.log('profileView loaded.');

      var wines = app.views.mycellarView.collection;
      console.log(wines.length);
      var noWines = wines.length;
      var avgRating = 0;
      if(wines.length > 0){
        wines.each(function(wine) {
          console.log(wine.attributes.rating);
          avgRating += parseInt(wine.attributes.rating);
        });
      } else {
        avgRating = 0;
      }
      
      var vars = {
        avgRating: avgRating,
        noWines: noWines
      }

      this.render(vars);
    },
    render: function(vars) {
      console.log('ProfileView: render');
      var wines = app.views.mycellarView.collection;

      if(wines.length > 0){
        vars.avgRating = (vars.avgRating / vars.noWines).toFixed(2);
      } else {
        vars.avgRating = 0;
      }

      this.$el.html(_.template(JST["assets/views/profile/tmpl-profile.html"]( vars )));

      return this;
    },
    doProfileSettings: function (e) {
      //reset the form fields..
      app.clearForm($('#profile-settings-modal form input'));
      var profileUser = app.user;
      
      $('#profileUsername').val(profileUser.attributes.username);
      $('#profileEmail').val(profileUser.attributes.email);
      $('#profileFirst').val(profileUser.attributes.firstname);
      $('#profileLast').val(profileUser.attributes.lastname);
      $('#profilePhone').val(profileUser.attributes.phone);
      $('#profileTwitter').val(profileUser.attributes.twitterKey);
      $('#profileFacebook').val(profileUser.attributes.facebookKey);
      $('#profileGoogle').val(profileUser.attributes.googleKey);
      $('#profileGithub').val(profileUser.attributes.githubKey);
    },
    doSubmitProfileChanges: function () {
      console.log('submitted profile changes');
      
      var self = this;
      var groups = "";

      $('#profileGroups').find(":selected").each(function() {
          groups = groups + $(this).text() + ", ";
      });


      app.user.save({
        firstname: $('#profileFirst').val(),
        lastname: $('#profileLast').val(),
        //groups
        groups: groups,
        phone: $('#profilePhone').val(),
        twitterKey: $('#profileTwitter').val(),
        facebookKey: $('#profileFacebook').val(),
        googleKey: $('#profileGoogle').val(),
        githubKey: $('#profileGithub').val()
      }).then(function(){
        self.render;
      });

    $('#profile-settings-modal').hide();


    }
  });

  app.ForgotView = Backbone.View.extend({
    el: '#forgot',
    template: _.template(JST["assets/views/login/forgot/tmpl-forgot.html"]()), //We need to jade this and pass data
    events: {
      'click #doForgot': 'doForgot'
    },
    initialize: function() {
      console.log('forgotView loaded.');
      //this.model = new app.Record();
      //this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    render: function() {
      this.$el.html(this.template( 'hello' ));
      return this;
    },
    doForgot: function(e){
      e.preventDefault();
      console.log('view: #doForgot clicked');
      //post...
      var data = {};
      data.email = $('#forgotEmail').val();

      $.post('api/v1/login/forgot/', data, function(response, status){
        console.log('responded:');
        console.dir(response);
        var alertStr = '';

        if(response.success){
          alertStr = '<div class="alert alert-success" role="alert">Success! Check your email.</div>';
          $('#forgotErrors').html(alertStr);
        } else {
          alertStr = '<div class="alert alert-danger" role="alert">' + response.errors + '</div>';
          $('#forgotErrors').html(alertStr);
        }

      });
    }
  });

  app.ResetView = Backbone.View.extend({
    el: '#reset',
    template: _.template(JST["assets/views/login/reset/tmpl-reset.html"]()), //We need to jade this and pass data
    events: {
      'click #doReset': 'doReset'
    },
    initialize: function() {
      console.log('resetView loaded.');
      //this.model = new app.Record();
      //this.listenTo(this.model, 'change', this.render);
      this.render();
    },
    render: function() {
      this.$el.html(this.template( 'hello' ));
      return this;
    },
    doReset: function(e){
      e.preventDefault();
      console.log('view: #doReset clicked');

      var data = {};
      data.password = $('#resetPassword').val();
      data.confirm = $('#resetConfirm').val();

      $.ajax({
          url: 'api/v1/login/reset/' + app.getUrlParameter('u') + '/' + app.getUrlParameter('t') + '/', 
          data: data,
          type: 'PUT',
          success: function(response) {
              // Do something with the result
              console.log('response:');
              console.dir(response);
              var alertStr = '';

              if(response.success){
                alertStr = '<div class="alert alert-success" role="alert">Success! Move along now. <a href="http://www.sidandsven.com">Click here</a> to go back!</div>';
                $('#resetErrors').html(alertStr);
              } else {
                alertStr = '<div class="alert alert-danger" role="alert">' + response.errors + '</div>';
                $('#resetErrors').html(alertStr);
              }
          }
      });
    }
  });

  /////////////////////////////////////////////////////////////
  //*************         ADMIN      ************************//
  /////////////////////////////////////////////////////////////

  app.AdminView = Backbone.View.extend({
    el: '#admin',
    template: _.template(JST["assets/views/admin/tmpl-admin.html"]( )), 
    events: {
      'click .delete-user': 'doDeleteUser',
      'click #submit-add-user': 'doAddUser',
      'click #loadEditModal': 'loadEditUser',
      'click #submit-edit-user': 'submitEditUser'
    },
    initialize: function(){

      console.log('adminView loaded.');

      var self = this;
      this.collection = new app.UserCollection();

      this.collection.fetch({
        success: function(collection, response, options){
          console.log('users retrieved');
          console.dir(collection);
          console.dir(response);
  
          self.render();
        }
      });
      
    },
    render: function() {
      console.log('AdminView: render');
      //console.dir(this.collection);
      var no_admins = 0;

      //Get total # of wines - for stats only
      $.ajax({
        url: "/api/v1/admin/totalwines/"
      }).done(function(total) {
        $('#no-wines').html(total);
      });
      
      this.$el.html(this.template());

      //Add + button
      $('#manage-users-table .btn-group').append('<button id="add-user" class="btn btn-default btn-sm" data-toggle="modal" data-target="#add-user-modal" data-backdrop="false"><span class="fa fa-plus"></span></button>');
      //Add the delete heading
      $('#manage-users-table .table thead tr').prepend('<th><span class="fa fa-trash-o"></span></th>');

      var frag = document.createDocumentFragment();
      this.collection.each(function(record) {
        //console.log('User name is: ' + record.attributes.username);
        record.attributes.roles = record.attributes.roles.replace("0", "admin");
        record.attributes.roles = record.attributes.roles.replace("1", "user");
        var view = new app.AdminResultsRowView({ model: record });
        frag.appendChild(view.render().el);

        if(record.attributes.roles.search("admin")+1){
          no_admins = no_admins + 1;
        }


      }, this);
      $('#admin-results-rows').append(frag);

      $('#no-users').html(this.collection.length);
      $('#no-admins').html(no_admins);


      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'remove', this.render);

      return this;
    },
    doDeleteUser: function(e) {

      var siblings = $(e.currentTarget).closest('tr').children();

      console.log('username: ');
        console.dir(siblings[2]);

      //parent tr remove, fadeOut
      var removeUser = this.collection.findWhere({
        username: siblings[2].innerText
      });
      console.log('removeUser: ')
      console.dir(removeUser);

      removeUser.destroy().complete(function(){
          self.collection.fetch();
        });
    },
    doAddUser: function() {
      
      var self = this;
      var newUser = new app.UserRecord();

      //100 user limit
      if(this.collection.length < 101){

        newUser.save({
          username: this.$el.find('#add-user-modal #userUsername').val(),
          email: this.$el.find('#add-user-modal #userEmail').val(),
          roles: "1,",
          createdById: app.user.attributes.id
        }, {
        success: function (model, response) {
          console.log("success");
          //console.dir(model);
          $('#add-user-modal').modal('hide');
          self.collection.add(model);
          self.collection.fetch();
        },
        error: function (model, response) {
            console.log("error");
        }
        });
      }
    },
    loadEditUser: function(e) {
      console.log('loading edit user data');
      //reset the form fields..
      app.clearForm($('#edit-user-modal form input'));

      var siblings = $(e.currentTarget).closest('tr').children();

      var updateUser = this.collection.findWhere({
        username: siblings[2].innerText
      });
      console.dir(updateUser);
      var roleAdmin = updateUser.attributes.roles.indexOf("admin,");
      var roleUser = updateUser.attributes.roles.indexOf("user,");

      $('#editUsername').val(updateUser.attributes.username);
      $('#editEmail').val(updateUser.attributes.email);
      $('#editFirst').val(updateUser.attributes.firstname);
      $('#editLast').val(updateUser.attributes.lastname);
      //isActive
      if(updateUser.attributes.isActive == 'yes'){
        $('#activeRadios #optionsRadios1').prop("checked", true);
      } else {
        $('#activeRadios #optionsRadios2').prop("checked", true);
      }
      //isVerified
      if(updateUser.attributes.isVerified == 'yes'){
        $('#verifiedRadios #optionsRadios1').prop("checked", true);
      } else {
        $('#verifiedRadios #optionsRadios2').prop("checked", true);
      }
      //roles
      if(roleAdmin != -1){
        $('#editRolesAdmin .admin').prop("checked", true);
      } 

      if(roleUser != -1){
        $('#editRolesUser .user').prop("checked", true);
      }
      //groups

      $('#editPhone').val(updateUser.attributes.phone);
      $('#editTwitter').val(updateUser.attributes.twitterKey);
      $('#editFacebook').val(updateUser.attributes.facebookKey);
      $('#editGoogle').val(updateUser.attributes.googleKey);
      $('#editGithub').val(updateUser.attributes.githubKey);


    },
    submitEditUser: function() {
      console.log('edit user submitted');
      var self = this;
      var isActive = "no";
      var isVerified = "no";
      var roles = "";
      var groups = "";
      var i = 0;

      var updateUser = this.collection.findWhere({
        username: $('#editUsername').val()
      });
      //console.log('user being updated is: ' + updateUser);


      isActive = $('input[name=activeRadios]:checked').val();
      isVerified = $('input[name=verifiedRadios]:checked').val();

      $('.checkbox input:checked').each(function() {
          roles = roles + $(this).val() + ", ";
      });

      $('#editGroups').find(":selected").each(function() {
          groups = groups + $(this).text() + ", ";
      });


      updateUser.save({
        firstname: $('#editFirst').val(),
        lastname: $('#editLast').val(),
        isActive: isActive,
        isVerified: isVerified,
        //roles
        roles: roles,
        //groups
        groups: groups,
        phone: $('#editPhone').val(),
        twitterKey: $('#editTwitter').val(),
        facebookKey: $('#editFacebook').val(),
        googleKey: $('#editGoogle').val(),
        githubKey: $('#editGithub').val()
      }).then(function(){
        self.render;
      });

    $('#edit-user-modal').hide();

    }
  });

  app.AdminResultsRowView = Backbone.View.extend({
    tagName: 'tr',
    viewDetails: function() {
      //location.href = this.model.url();
    },
    render: function() {
      this.$el.html(_.template(JST["assets/views/admin/users/tmpl-a-users.html"](this.model)));

      if(this.model.attributes.username == "root"){
        //Do not show delete checkbox for root account
        console.log('row user is root');
        console.dir(this.$('.delete-user').html());
        this.$('.delete-user').remove();
      } 

      return this;
    }
  });

  /////////////////////////////////////////////////////////////
  //*************         MAIN      ************************//
  /////////////////////////////////////////////////////////////


  window.onload = function(){
    console.log('app loading...');
    app.firstLoad = true;
    //app.router = new app.Router();
    //Backbone.history.start();

    //check with server if predefined session exists
    app.user = new app.User();
    app.user.fetch({
        success: function(model, response, options){
          console.log('fetched user');
          console.dir(model);
          console.dir(response);
          //console.dir(options);
          
          //if exists then theyre logged in
          if((model.attributes.username != undefined) && (model.attributes.username != "")){
            app.finishSignIn();
          }
          //otherwise we're not logged in
        }
      });


    app.views = {};

    app.views.headerView = new app.HeaderView();
    app.views.homeView = new app.HomeView();
    app.views.current = app.views.homeView;
    app.views.aboutView = new app.AboutView();
    app.views.cellarView = new app.CellarView();
    //mycellarView: created upon login
    //profile: created upon login
    //admin: created upon login
    app.views.forgotView = new app.ForgotView();
    app.views.resetView = new app.ResetView();
    console.log('app loaded!');

    //if params, load up reset screen
    console.log(app.getUrlParameter('u'));
    console.log(app.getUrlParameter('t'));
    if(typeof app.getUrlParameter('u') != 'undefined' && typeof app.getUrlParameter('t') != 'undefined'){
      app.showView(app.views.resetView);
    }

  };

  /////////////////////////////////////////////////////////////
  //*************         UTILS      ************************//
  /////////////////////////////////////////////////////////////

  app.clearForm = function(frm_elements){
    console.log('clear the form: ' + frm_elements);

    for (var i = 0; i < frm_elements.length; i++)
    {
        var field_type = frm_elements[i].type.toLowerCase();
        switch (field_type)
        {
        case "text":
        case "password":
        case "textarea":
        case "hidden":
            frm_elements[i].value = "";
            break;
        case "radio":
        case "checkbox":
            if (frm_elements[i].checked)
            {
                frm_elements[i].checked = false;
            }
            break;
        case "select-one":
        case "select-multi":
            frm_elements[i].selectedIndex = -1;
            break;
        default:
            break;
        }
    }

  }

  app.finishSignIn = function (){

    if(typeof app.views.mycellarView == 'undefined'){
        console.log('creating mycellarView');
        var initialization = true;
        app.views.mycellarView = new app.MyCellarView();
        app.views.detailsView = new app.DetailsRowView();

      } 

    /*if(typeof app.views.profileView == 'undefined'){
      console.log('creating profileView');
      app.views.profileView = new app.ProfileView();
      if(app.user.attributes.roles.indexOf('0,') != -1){
        app.views.adminView = new app.AdminView();
      }
    }*/

    /*if(typeof app.views.adminView == 'undefined'){
      
      if(app.user.attributes.roles.indexOf('0,') != -1){
        app.views.adminView = new app.AdminView();
      }
    }*/

    console.log('finishSignIn');
    $('.form-control').attr('disabled', false);
    $('#doSignIn').attr('disabled', false);
    $('#doSignUp').attr('disabled', false);
    $('#signinupDropdown').attr('disabled', false);
    $('.dropdown-menu').attr('disabled', false);
    $('#signStatus').css("display", "none");

    //change button to username
    var loggedInBtn = '<button id="signedinDropdown" class="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">';
    loggedInBtn += '<span class="fa fa-user"></span> ' + app.user.attributes.username + ' <span class="caret"></span></button>';
    loggedInBtn += '<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="signedinDropdown">';
    loggedInBtn += '<li><a id="bprofile" href="#">Profile</a></li>';
    if(app.user.attributes.roles.indexOf('0,') != -1){  //if they have admin role
      loggedInBtn += '<li><a id="badmin" href="#">Administer</a></li>';
    }
    loggedInBtn += '<li><a id="signout" href="http://www.sidandsven.com/logout/">Sign Out</a></li>';
    loggedInBtn += '</ul>';

    $('div.dropdown').html(loggedInBtn);
    $('.dropdown-toggle').dropdown('toggle');

    //move to cellar
    app.showView(app.views.cellarView);
    $(app.views.detailsView.el).hide(); 

  }

  app.getUrlParameter = function (sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
  }      

  app.showView = function (view, model){
    console.log('showView: ');
    console.dir(view.el);

    //If user has clicked on a wine to open the details
    if(view == app.views.detailsView && typeof model != 'undefined'){
      console.log('The model is: ');
      console.dir(model);
      view.model = model;
    }

    if (view != app.views.resetView) { //If user clicks away from reset page, remove url params
      if (typeof app.getUrlParameter('u') != 'undefined'){
        window.history.replaceState( {} , 'Sid is awake.', 'http://www.sidandsven.com' );
      } else if (typeof app.getUrlParameter('t') != 'undefined'){
        window.history.replaceState( {} , 'Sid is awake.', 'http://www.sidandsven.com' );
      }
    }

    if(view == app.views.cellarView && typeof app.user != 'undefined' && app.user.attributes.username != "") { //If user logged in, change cellarView
      console.log('showView: user logged in and requested cellarView');
      
      view = app.views.mycellarView;
    }

    if(app.views.current != undefined){
        $(app.views.current.el).hide();
    }
    app.views.current = view;
    $(app.views.current.el).show();

  };

  /////////////////////////////////////////////////////////////
  //*********************************************************//
  /////////////////////////////////////////////////////////////

}());
