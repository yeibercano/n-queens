// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // return false; // fixme
      // console.log("!!!!!!! When has Row Conflict is called, this.rows is ", this.rows());
     // iterate through each row

    // first implementation
    // var conflict = false;
    // var rows = this.rows();
    // for (var i = 0; i < rows.length; i++) {
    //   for (var j = 0; j < rows[i].length; j++) {
    //     if(rows[i][j] === 1) {
    //       conflict = true
    //     }
    //   };
    // };

    // return conflict;
    var hasBeenFoundTimes = 0;
    var conflict = false;

    // console.log('row Index for some reason is  ', rowIndex);

   // console.log("we haven't incremented i!!!!!!!!! it's now: ", i);
    for (var i = 0; i < rowIndex.length; i++) {
      // console.log("item we're seeing now at this i is", rowIndex[i]);
      if(rowIndex[i] === 1) {
        hasBeenFoundTimes ++;
        // console.log('hasBeenFoundTimes:', hasBeenFoundTimes)
      }
    }
    if(hasBeenFoundTimes > 1){
      // console.log("!!!!!!!!!!!!!!! the this right now is ", this)
      conflict = true;
      // console.log('it executes:',conflict);
    }  

  //return flag
  return conflict;
  
    // return _.contains(this, this.hasRowConflictAt());
   // check if row contains an array that contains the value of 1
     
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return false; // fixme
      // console.log('this when we run Any Row Conlicts is ', this);
      // // Iterate through each row of the board
      //   // for each row, run hasRowConflictAt

      // // collects all rows
      var result = false;
      var rows = this.rows();
      // console.log('all rows:', rows)
      for (var i = 0; i < rows.length; i++) {
        // console.log('*****this should be a row:', rows[i]);
        if(this.hasRowConflictAt(rows[i])){
          result = true;
        }
        // console.log("when we call ANYANYANYANY conflicts, this is", this)
        // this.hasAnyRowConflicts.call(this, rows[i]);
      }
      return result;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      // var hasBeenFoundThisManyTimes = 0;
      // var hasFoundAConflict = false;
      // for(var i = 0; i < rows.length; i++){
      //   // console.log("i is ", i);
      //   // console.log();
      //   // console.log("$$$$$$$$$$ when has Column Conflict, rows[i][colIndex] is ", rows[i][colIndex])];
      //   if(rows[i][colIndex] === 1){
      //     hasBeenFoundThisManyTimes ++;
      //   }
      // }
      // // invoke has row conflict at every column index
      // return hasFoundAConflict;
      // console.log("HELLLOOOOOOOOOOOOOOO")
      // return this.hasRowConflictAt(colIndex);
      // var hasBeenFoundTimes = 0;
      // var conflict = false; 
      
      //Option 1
      // create an array to store colum copies
      // var column = [];
      // var board = this.rows();
      // // iterate through the rows
      // for (var i = 0; i < board.length; i++) {
      // //push into the column the first index of each array
      //   // console.log('board[i][colIndex]:', board[i][colIndex]);
      //   // if( )
      //   column.push(board[i][colIndex]);
      // }
      // // console.log("$$$$$$$$$ the column copy at the end of hasColConf is ", column);
      // // console.log("********* this at the end of hasColConflictAt", this);
      // return this.hasRowConflictAt(column);

      //option 2
      var counter = 0;
      var board = this.rows();
      _.each(board, function(row){
        if(row[colIndex] === 1) {
          counter ++;
        }
      });

      if(counter > 1){
        return true;
      } else {
        return false;
      }
   
    },



    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // create a hasBeenFound flag set 
      // create a variable to represent the entire board
      var board = this.rows();
      // for loop to increment colIndex
      for (var i = 0; i < board.length; i++) {
        if(this.hasColConflictAt(i)) {
          return true;
        } else {
          return false
        }
      }
        // for each col Index i starting at 0
          // call hasColConflict(i)
            // if current column i has a conflict
              // return conflict is true
            // else
              // increment i to check  next column

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create a counter variable
      var counter = 0;
      // create a variable that refers to the rows 
      var board = this.rows();
      // use a for loop to iterate through the rows
      for(var i = 0; i < board.length; i++){
        // check if item at board[i][major diagonal] is === 1
        if(board[i][majorDiagonalColumnIndexAtFirstRow] === 1){
        // console.log("!!!!!!!!!!!! major Diagonal [i] is Being Called !!!!!!!!", i);
          // increment counter
          counter ++;
        }
        majorDiagonalColumnIndexAtFirstRow ++;
      }
      // check if counter is > 1 
      if(counter > 1){
        // return true
        return true;
      // otherwise 
      } else {
        // return false
        return false;
      }

      // console.log("********** our friends, the diagonales", majorDiagonalColumnIndexAtFirstRow);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme
      // declare a variable for col --> var colums;
      // console.log('hasAnyMajorDiagonalConflicts')
      console.log(this)
      var col;
      //declare a variable for rows
      var row; 
      // asssign a board variable to all rows --> this.rows();
      var board = this.rows();
      // loop through the rows --> for (var row = 0; board)
      for (row = 0; row < board.length; row++) {
           //nested for loop for columns (var col = 0; col board[row].length)
        for (col = 0; col < board[row].length; col++) {
          console.log("!!!!!!!!!!!!!!!!! row is ", board[row]);
          console.log(" ******** col is", board[row][col]);

             //check if true invoking hasMajorDiagonalConflictAt(board[row][col])
        }
        // if(this.hasMajorDiagonalConflictAt(board[row][col])) {
        //   //return  true;
        //   return true;
        // } else {
        //    // otherwise flase
        //   return false;
        // }
      }

      //option 2

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
      // console.log("&&&&&&&&&&&& our friends, the minors", minorDiagonalColumnIndexAtFirstRow);
      // // create a counter variable
      // var counter = 0;
      // // create a variable that refers to the rows 
      // var board = this.rows();
      // // use a for loop to iterate through the rows starting at the last row
      // for (var i = board.length - 1; i >= 0; i--) { // console log this later 
      //   console.log('board[i], minor:', board[i][minorDiagonalColumnIndexAtFirstRow])
      //   // check if item at board[i][major diagonal] is === 1
      //   if(board[i][minorDiagonalColumnIndexAtFirstRow] === 1){
      //     // increment counter
      //     console.log('counter before:', counter)
      //     counter ++;
      //     console.log('counter after:', counter)

      //   }
      // }
      // console.log('counter:', counter)
      // // check if counter is > 1 
      // if(counter > 1){
      //   // return true
      //   // console.log(true)
      //   return true;
      // // otherwise 
      // } else {
      //   // console.log(false)
      //   // return false
      //   return false;
      // }
    },


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
      // var col;
      // //declare a variable for rows
      // var row; 
      // // asssign a board variable to all rows --> this.rows();
      // var board = this.rows();
      // // loop through the rows --> for (var row = 0; board)  >>>>> adjust starting point, move through items correctly
      // for (row = 0; row < board.length; row++) {
      //      //nested for loop for columns (var col = 0; col board[row].length)
      //   for (col = 0; col < board[row].length; col++) {
      //        //check if true invoking hasMajorDiagonalConflictAt(board[row][col])
      //     if(hasMajorDiagonalConflictAt(board[row][col])) {
      //     //return  true;
      //       return true;
      //     } else {
      //        // otherwise flase
      //       return false;
      //     }
      //   }
      // }
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
