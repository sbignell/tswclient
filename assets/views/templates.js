this["JST"] = this["JST"] || {};

this["JST"]["assets/views/about/tmpl-about.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="page-header"><h1>The Project</h1><p> <b>Objective: To get you up and running with a single page web app as quickly as possible.</b></p><p>This project exists because I\'ve built a few side project apps and always disliked the initial time spent getting a framework and the other pieces together to actually get something simple off the ground. I found myself coming back to the Drywall project time and time again, and manipulating it for my purposes time and time again. I recently decided to take Drywall, modify it and extend it to my purposes and give that back to the community to be used by anyone to kickstart their apps too. The main differences are that I\'ve incorporated MySQL for both data store and sessions via Sequelize and express-mysql-session, that the front-end is a singl page javascript app, and that it interacts with the back-end via a RESTful API. Bonus: The client and server are completely separated, you could therefore turn the client into a mobile app using cordova (phonegap) really easily thereby keeping consistent code across web app and mobile app, or just plug your own front-end in.</p><p>A huge thank you and shout out to Reza Akhavan and the <a href="http://jedireza.github.io/drywall/" target="_blank">Drywall project</a>, as well as to Christophe Coenraets and his <a href="http://coenraets.org/blog/2012/10/nodecellar-sample-application-with-backbone-js-twitter-bootstrap-node-js-express-and-mongodb/" target="_blank">Wine Cellar tutorial</a>, from which I\'ve taken his great idea of a wine cellar to showcase how you can use this tool.  </p></div></div>';

}
return __p
};

this["JST"]["assets/views/admin/tmpl-admin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="col-sm-6"><div class="page-header"><h1>Admin Area</h1></div><div class="row"><div class="col-sm-4"><div class="well stat"><div id="no-users" class="stat-value"></div><div class="stat-label">Users</div></div></div><div class="col-sm-4"><div class="well stat"><div id="no-admins" class="stat-value"></div><div class="stat-label">Admins</div></div></div><div class="col-sm-4"><div class="well stat"><div id="no-wines" class="stat-value"></div><div class="stat-label">Wines        </div></div></div></div></div><div class="col-sm-6 special"><div class="page-header"><h1>Super Dashboard</h1></div><i class="fa fa-5x fa-gears super-awesome"></i></div></div><div class="row"><div class="col-md-8 col-md-offset-2"><div id="manage-users-table" class="panel panel-default"><div class="panel-heading"><div role="group" aria-label="..." class="btn-group pull-right"> </div><h3 class="panel-title">Manage Users</h3></div><div class="panel-body"></div><table class="table table-striped"><thead><tr><th>id</th><th>username</th><th>email</th><th>active</th><th>verified</th><th>roles</th></tr></thead><tbody id="admin-results-rows"> </tbody></table></div></div></div><div class="row"><div id="add-user-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Add User</h4></div><div class="modal-body"><form><div class="form-group"><label for="userUsername">Username</label><input id="userUsername" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="userEmail">Email</label><input id="userEmail" type="text" placeholder="" class="form-control"/></div></form></div><div class="modal-footer"><button id="cancel-user" type="button" data-dismiss="modal" class="btn btn-default">Cancel</button><button id="submit-add-user" type="button" class="btn btn-primary">Save                                                                  </button></div></div></div></div></div><div class="row"><div id="edit-user-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Edit User</h4></div><div class="modal-body"><form><div class="form-group"><label for="editUsername">Username</label><input id="editUsername" type="text" placeholder="" disabled="disabled" class="form-control"/></div><div class="form-group"><label for="editEmail">Email</label><input id="editEmail" type="text" placeholder="" disabled="disabled" class="form-control"/></div><div class="form-group"><label for="editFirst">First Name</label><input id="editFirst" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="editLast">Last Name</label><input id="editLast" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="activeRadios">is Active?</label><div id="activeRadios"><div class="radioActive"><label><input type="radio" name="activeRadios" id="optionsRadios1" value="yes"/>  yes</label></div><div class="radioActive"><label><input type="radio" name="activeRadios" id="optionsRadios2" value="no"/>  no</label></div></div></div><div class="form-group"><label for="verifiedRadios">is Verified?</label><div id="verifiedRadios"><div class="radioVerified"><label><input type="radio" name="verifiedRadios" id="optionsRadios1" value="yes"/>  yes</label></div><div class="radioVerified"><label><input type="radio" name="verifiedRadios" id="optionsRadios2" value="no"/>  no</label></div></div></div><div class="form-group"><label for="editRoles">Roles</label><div id="editRolesAdmin" class="checkbox"><label><input type="checkbox" value="admin" class="admin"/>Admin</label></div><div id="editRolesUser" class="checkbox"><label><input type="checkbox" value="user" class="user"/>User</label></div></div><div class="form-group"><label for="editGroups">Groups</label><select id="editGroups" multiple="multiple" class="form-control">    </select></div><div class="form-group"><label for="editPhone">Phone Number</label><input id="editPhone" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="editTwitter">Twitter Key</label><input id="editTwitter" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="editFacebook">Facebook Key</label><input id="editFacebook" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="editGoogle">Google Key</label><input id="editGoogle" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="editGithub">Github Key</label><input id="editGithub" type="text" placeholder="" class="form-control"/></div></form></div><div class="modal-footer"><button id="cancel-user" type="button" data-dismiss="modal" class="btn btn-default">Cancel</button><button id="submit-edit-user" type="button" class="btn btn-primary">Save                                                                    </button></div></div></div></div></div>';

}
return __p
};

this["JST"]["assets/views/admin/users/tmpl-a-users.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td class="delete"> <input type="checkbox" class="delete-user"/></td><td>' +
((__t = ( attributes.id )) == null ? '' : __t) +
'</td><td> <a id="loadEditModal" href="#" data-toggle="modal" data-target="#edit-user-modal" data-backdrop="false">' +
((__t = ( attributes.username )) == null ? '' : __t) +
'</a></td><td>' +
((__t = ( attributes.email )) == null ? '' : __t) +
'</td><td>' +
((__t = ( attributes.isActive )) == null ? '' : __t) +
'</td><td>' +
((__t = ( attributes.isVerified )) == null ? '' : __t) +
'</td><td>' +
((__t = ( attributes.roles )) == null ? '' : __t) +
'</td>';

}
return __p
};

this["JST"]["assets/views/cellar/tmpl-cellar.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="media"><div class="media-left"><img src="media/Robert3.png" class="media-object"/></div><div class="media-body"><h4 class="media-heading">Welcome!</h4><p class="cellarConversation">This needs to have some basic charts or recent activity</p><p> followed by controls to change it from list to ui to some other view... a menu to buy wine etc</p></div><div class="clearfix"></div></div></div><div class="row"><div class="col-md-8 col-md-offset-2"><div role="group" aria-label="..." class="btn-group"> <button id="add-wine" data-backdrop="false" class="btn btn-default btn-sm">Add <span class="fa fa-plus"></span></button></div><div class="panel panel-default"><table class="table"><thead><th> <span class="fa fa-trash-o"></span></th><th><span class="fa fa-pencil-square-o"></span></th><th> <i>Image?  </i></th><th>Varietal</th><th>Producer</th><th>Wine</th><th>Vintage</th><th>Quantity</th><th>My Notes</th><th>My Rating</th><th> <i>History (last action)</i></th></thead><tbody id="results-rows"></tbody></table></div></div></div>';

}
return __p
};

this["JST"]["assets/views/cellar/wines/tmpl-wine-details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><h1>Add/Edit Wine</h1><form id="add-edit-wine"><div class="form-group hidden"><label for="detailsID">ID</label><input id="detailsID" type="text" class="form-control"/></div><div class="form-group"><label for="detailsVarietal">Varietal</label><input id="detailsVarietal" type="text" placeholder="Shiraz" class="form-control"/></div><div class="form-group"><label for="detailsProducer">Estate</label><input id="detailsProducer" type="text" placeholder="Penfolds" class="form-control"/></div><div class="form-group"><label for="detailsWineName">Wine</label><input id="detailsWineName" type="text" placeholder="Bin 104 Special Reserve" class="form-control"/></div><div class="form-group"><label for="detailsVintage">Wine</label><input id="detailsVintage" type="text" placeholder="2012" class="form-control"/></div><div class="form-group"><label for="detailsQuantity">Wine</label><input id="detailsQuantity" type="text" placeholder="12" class="form-control"/></div><div class="form-group"><label for="detailsMyNotes">Notes</label><textarea id="detailsMyNotes" type="text" placeholder="Spicy with hints of orange zest" class="form-control"> </textarea></div><div class="form-group"><label for="detailsMyRating">Rating</label><select id="detailsMyRating" class="form-control"><option>10</option><option>9.9     </option><option>9.8  </option><option>9.7  </option><option>9.6  </option><option>9.5  </option><option>9.4  </option><option>9.3  </option><option>9.2  </option><option>9.1</option><option>9.0</option><option>8.9     </option><option>8.8  </option><option>8.7  </option><option>8.6  </option><option>8.5  </option><option>8.4  </option><option>8.3  </option><option>8.2  </option><option>8.1</option><option>8.0 </option><option>7.5</option><option>7.0 </option><option>6.5</option><option>6.0 </option><option>5.5</option><option>5.0</option><option>4.0</option><option>3.0 </option><option>2.0</option><option>1.0     </option></select></div></form></div><div class="row footer"><button id="cancel" type="button" data-dismiss="modal" class="btn btn-default">Cancel</button><button id="save" type="button" class="btn btn-primary">Save                             </button></div>';

}
return __p
};

this["JST"]["assets/views/cellar/wines/tmpl-wines.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td class="delete"> <button id="delete-wine" data-backdrop="false" class="btn btn-default btn-sm"> <span class="fa fa-trash-o"></span></button></td><td class="edit"> <button id="wine-details" data-backdrop="false" class="btn btn-default btn-sm"><span class="fa fa-pencil-square-o"></span></button></td><td id="id" class="hidden">' +
((__t = ( attributes.id )) == null ? '' : __t) +
'</td><td class="image">   </td><td class="varietal">' +
((__t = ( attributes.varietal )) == null ? '' : __t) +
'</td><td class="producer">' +
((__t = ( attributes.producer )) == null ? '' : __t) +
'</td><td id="name">' +
((__t = ( attributes.wineName )) == null ? '' : __t) +
'</td><td class="vintage">' +
((__t = ( attributes.vintage )) == null ? '' : __t) +
'</td><td class="quantity">' +
((__t = ( attributes.quantity )) == null ? '' : __t) +
'</td><td class="myNotes">' +
((__t = ( attributes.myNotes )) == null ? '' : __t) +
'</td><td class="myRating">' +
((__t = ( attributes.myRating )) == null ? '' : __t) +
'</td>';

}
return __p
};

this["JST"]["assets/views/features/tmpl-features.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="media"><div class="media-left"><!--img.media-object(src="media/Robert3.png")--></div><div class="media-body"><h4 class="media-heading">Features Page</h4><p class="cellarConversation">This needs to have the features of the product.. 1,2,3</p><p> ..and more reasons to use it, not an example cellar</p></div><div class="clearfix"></div></div></div>';

}
return __p
};

this["JST"]["assets/views/header/tmpl-header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container"><div class="navbar-header"><a id="gotoHome" href="#" class="navbar-brand"><img src="favicon.ico" class="navbar-logo"/><span class="navbar-brand-label">  Top Shelf</span></a><button data-toggle="collapse" data-target=".my-navbar-collapse" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><div class="navbar-collapse my-navbar-collapse collapse"><ul id="public-menu" class="nav navbar-nav"></ul><div class="pull-right"><div class="dropdown"><button id="signinupDropdown" type="button" data-toggle="dropdown" aria-expanded="true" class="btn btn-primary dropdown-toggle">Sign-In/Up <span class="caret"></span></button><ul role="menu" aria-labelledby="signinupDropdown" class="dropdown-menu dropdown-menu-right"><form id="signForm"><div class="form-group"><label for="inputUsername">Username</label><input id="inputUsername" type="text" placeholder="Enter username" class="form-control"/></div><div class="form-group"><label for="inputPassword">Password</label><input id="inputPassword" type="password" placeholder="Password" class="form-control"/></div><button id="doSignIn" class="btn btn-info btn-block">Sign In</button><p id="forgotResetLine" class="small"> <a id="gotoForgot" href="#">Forgot Password</a></p><hr/><div id="signUpEmail" class="form-group"><label for="inputEmail">Email</label><input id="inputEmail" type="email" placeholder="Enter email" class="form-control"/></div><button id="doSignUp" class="btn btn-warning btn-block">Sign Up</button><!--div#social-signup--><!--  p - or ---><!--  div#social-signup-buttons--><!--   a#facebook.btn.btn-secondary(href="#" role="button")--><!--    i.fa.fa-facebook--><!--   a#twitter.btn.btn-secondary(href="#" role="button")--><!--    i.fa.fa-twitter--><!--   a#google.btn.btn-secondary(href="#" role="button")--><!--    i.fa.fa-google--><!--   a#github.btn.btn-secondary(href="#" role="button")--><!--    i.fa.fa-github --><div id="signStatus"><span class="fa fa-5x fa-spinner fa-spin"></span></div><div id="signAlert">   </div></form></ul></div></div></div></div>';

}
return __p
};

this["JST"]["assets/views/home/tmpl-home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="jumbotron"><h1>A place for good wine<div class="story">   <p class="lead">Top Shelf is the leading Wine Cellar app to manage, research, track and buy your wine!     </p></div><div class="clearfix"></div></h1></div><div class="row"><div class="col-sm-4"><div class="panel panel-default"><div class="panel-body"><h3>Features</h3><p> Show the 3 feature bubbles here... etc</p></div></div></div></div>';

}
return __p
};

this["JST"]["assets/views/login/forgot/tmpl-forgot.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="col-sm-6"><div class="page-header"><h1>Forgot Your Password?</h1></div><div id="forgotForm"><form><div class="form-group"><label>Enter Your Email:</label><input id="forgotEmail" type="text" name="email" class="form-control"/></div><div class="form-group"><button id="doForgot" type="button" class="btn btn-primary btn-forgot">Send Reset </button></div><div id="forgotErrors" class="form-group">    </div></form></div></div></div>';

}
return __p
};

this["JST"]["assets/views/login/reset/tmpl-reset.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="col-sm-6"><div class="page-header"><h1>Reset Your Password</h1></div><div id="resetForm"><form><div class="form-group"><label>New Password:</label><input id="resetPassword" type="password" name="password" class="form-control"/></div><div class="form-group"><label>Confirm Password:</label><input id="resetConfirm" type="password" name="confirm" class="form-control"/></div><div class="form-group"><button id="doReset" type="button" class="btn btn-primary btn-reset">Set Password</button></div><div id="resetErrors" class="form-group">    </div></form></div></div></div>';

}
return __p
};

this["JST"]["assets/views/profile/tmpl-profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row"><div class="col-sm-6"><div class="page-header"><h1>My Profile<button id="profile-settings" data-toggle="modal" data-target="#profile-settings-modal" data-backdrop="false" class="btn btn-primary pull-right">Settings</button></h1></div><div class="row"><div class="col-sm-4"><div class="well stat"><div class="stat-value no-of-wines">' +
((__t = ( noWines )) == null ? '' : __t) +
'</div><div class="stat-label"># of Wines</div></div></div><div class="col-sm-4"><div class="well stat"><div class="stat-value avg-rating">' +
((__t = ( avgRating )) == null ? '' : __t) +
'</div><div class="stat-label">Avg Rating</div></div></div><div class="col-sm-4"><div class="well stat"><div class="stat-value week-of-year">--</div><div class="stat-label">Week of Year</div></div></div></div><div class="row"><div class="col-sm-4"><div class="well stat"><div class="stat-value day-of-week">--</div><div class="stat-label">Day of Week</div></div></div><div class="col-sm-4"><div class="well stat"><div class="stat-value week-year">--</div><div class="stat-label">Week Year</div></div></div><div class="col-sm-4"><div class="well stat"><div class="stat-value hour-of-day">--</div><div class="stat-label">Hour of Day</div></div></div></div></div><div class="col-sm-6 special"><div class="page-header"><h1>Go Faster Everyday</h1></div><img src="media/Clive.png" style="width: 110px; height: 209px;" class="media-object"/></div></div><div class="row"><div id="profile-settings-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Profile Settings</h4></div><div class="modal-body"><form><div class="form-group"><label for="profileUsername">Username</label><input id="profileUsername" type="text" placeholder="" disabled="disabled" class="form-control"/></div><div class="form-group"><label for="profileEmail">Email</label><input id="profileEmail" type="text" placeholder="" disabled="disabled" class="form-control"/></div><div class="form-group"><label for="profileFirst">First Name</label><input id="profileFirst" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="profileLast">Last Name</label><input id="profileLast" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="profilePhone">Phone</label><input id="profilePhone" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="profileTwitter">Twitter Key</label><input id="profilewitter" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="profileFacebook">Facebook Key</label><input id="profileFacebook" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="profileGoogle">Google Key</label><input id="profileGoogle" type="text" placeholder="" class="form-control"/></div><div class="form-group"><label for="profileGithub">Github Key</label><input id="profileGithub" type="text" placeholder="" class="form-control"/></div></form></div><div class="modal-footer"><button id="cancel-profile" type="button" data-dismiss="modal" class="btn btn-default">Cancel</button><button id="submit-profile" type="button" class="btn btn-primary">Save                                 </button></div></div></div></div></div>';

}
return __p
};