var favouriteReads = JSON.stringify( require( "../data/person-favourite-reads.json" ) );
var ldQuery = require( "../../src/ld-query" );
var should = require( "should" );

module.exports = function() {
    
    this.Given(/^the sample data containing favourite reads is loaded$/, function () {
    
        this.data = JSON.parse( favouriteReads );
        
    } );
    
    this.Given(/^I construct an ldQuery object using <context>$/, function (table) {
        
        this.context = JSON.parse( table.hashes()[ 0 ].context );
        this.query = ldQuery( this.data, this.context );
         
    } );
    
    this.When(/^I query for "([^"]*)"$/, function ( selector ) {
    
        this.result = this.query.query( selector );
        
    } );
    
    this.Then(/^the result should be a QueryNode object$/, function() {
      
        should.exist( this.result, "No query object found" );
        should.exist( this.result.query, "No query method found" );
        should.exist( this.result.queryAll, "No queryAll method found" );
        
    } );
    
    this.Then(/^the result should be "([^"]*)"$/, function( expected ) {
        
        this.result.should.eql( expected );
        
    } );
    
};