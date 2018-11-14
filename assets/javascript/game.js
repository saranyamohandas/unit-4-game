$(document).ready(function(){
//    var combatPoints = [{name : 'avatar1',hp:100,ap:20},
//                         {name :'avatar2', hp:200,ap:20},{name:'avatar3',hp:350,ap:30},
//                         {name: 'avatar4',hp:500,ap:25}];
    var combatPoints = [{name : 'John Snow',hp:100,ap:25},
                         {name :'Cersei', hp:200,ap:20},{name:'Daenerys',hp:350,ap:30},
                         {name: 'White Walker',hp:500,ap:20}];
    var challenger = false;
    var defender = false;
    var defeated = 0;
    var challengerAp = 0;
    var defenderAp = 0;
    var attacks = 0;
    var getChallengerId;
    var getDefenderId;
    var getChallengerpt = {};
    var getDefenderpt = {};
    var getDefenderName,getDefenderImg,getDefenderHp;
    

    $('#avatar1').find('p:last').text('HP:' + combatPoints[0].hp);
    $('#avatar2').find('p:last').text('HP:' + combatPoints[1].hp);
    $('#avatar3').find('p:last').text('HP:' + combatPoints[2].hp);
    $('#avatar4').find('p:last').text('HP:' + combatPoints[3].hp);
    $('#challengeZone').hide();
    $('#defenderZone').hide();
    $('#attack').hide();
    $('#reset').hide();
    $('#score').hide();
    $('#msg').hide();
    
    $('.card').on('click',function(){
        //check if challenger or defender
        if (!challenger){
            challenger = true;
            console.log("am here");
            getChallengerId = $(this).attr('id');
//            console.log(getChallengerId);
            var getChallengerName = $(this).find("p:first").text();
            var getChallengerImg = $(this).find('img').attr('src');
            var getChallengerHp = $(this).find("p:last").text();
            $(this).hide();
            $('#choice').text('Choose your defender')
            $('#challengerName').text(getChallengerName);
            $('#challengerHp').text(getChallengerHp);
            $('#challengerImg').attr('src',getChallengerImg);
            $('#challengeZone').show();
    
            getChallengerpt = getCombatAp(getChallengerName);
        } else  {
//            if(defeated <= combatPoints.length -1)
            $('#msg').hide();
            defeated += 1;
           // defender = true;
            console.log("defeated - ",defeated);
            getDefenderId = $(this).attr('id');
//            console.log(getDefenderId);
            getDefenderName = $(this).find("p:first").text();
            getDefenderImg = $(this).find('img').attr('src');
            getDefenderHp = $(this).find("p:last").text();
            $(this).hide();
//            $('#attack').css('display','block');
            $('#attack').show();
            $('#reset').show();
            $('#defenderName').text(getDefenderName);
            $('#defenderHp').text(getDefenderHp);
            $('#defenderImg').attr('src',getDefenderImg);
            $('#defenderZone').show();
//            $('#defenderZone').css('display','block');
            getDefenderpt = getCombatAp(getDefenderName);
//            console.log(getDefenderName);
//            console.log(getDefenderHp);
//            console.log(getDefenderImg);
//            $(".card").off("click");
//            $(".card").on("click");
            //remove clicks on rest of the defenders
            
        }
    });
    $('#attack').click(function(){
       
       
        console.log(!challengerAp);
      //  if(!challengerAp){
//            console.log("challengerap");
//            console.log(getChallengerId);
//            console.log(getChallengerpt);
//            console.log(getDefenderpt);
            if(getChallengerpt.attackerHp > 0){
                //update challenger HP
                getChallengerpt.attackerHp = getChallengerpt.attackerHp - getDefenderpt.attackerAp;
                $('#challengerHp').text("HP :" +getChallengerpt.attackerHp );
                getDefenderpt.attackerHp = getDefenderpt.attackerHp - getChallengerpt.attackerAp;
                //update defender HP
                $('#defenderHp').text("HP :" +getDefenderpt.attackerHp );
                $('.defendend').text(getDefenderName); $('#yourDamage').text(getChallengerpt.attackerAp);
                $('#defendDamage').text(getDefenderpt.attackerAp);
                getChallengerpt.attackerAp = getChallengerpt.attackerAp * 2;
                attacks ++;
                $('#score').show();
//                console.log(attacks);
//                console.log(getChallengerpt.attackerHp);
                checkWinner(getChallengerpt.attackerHp,getDefenderpt.attackerHp)
                
            } 
//            if(getDefenderpt.attackerHp > 0){
//                console.log(getDefenderpt.attackerHp > 0);
//                getDefenderpt.attackerHp = getDefenderpt.attackerHp - getChallengerpt.attackerAp;
//                
//                $('#defenderHp').text("HP :" +getDefenderpt.attackerHp );
//                $('.defendend').text(getDefenderName); $('#yourDamage').text(getChallengerpt.attackerAp);
//                getChallengerpt.attackerAp = getChallengerpt.attackerAp * 2;
////                $('#score').show();
//                //checkWinner();
//            } 
        
    });
    function getCombatAp(attacker){
        for(i=0;i<combatPoints.length; i++){
                if(combatPoints[i].name == attacker){
                attackerAp = combatPoints[i].ap;              
                attackerHp = combatPoints[i].hp;
                return {attackerAp : attackerAp,attackerHp: attackerHp};
//                console.log(attackerAp)
//                console.log(attackerHp);
            }
            }
    }
    function checkWinner(challengerHP,defenderHP){
        console.log(challengerHP);
        if (challengerHP <= 0){
            console.log("inside winner")
            $('#msg1').text('You lost the game!');
            $('#msg').show();
             $('#choice').text('Game Over!!')
            $(".card").off("click");
            $("#attack").off("click");
            
            } else if( (defeated == 3)) {
            $('#msg1').text('You won the game!');
            $('#msg').show();
            $('#choice').text('Game Over!!')
            $(".card").off("click");
            $("#attack").off("click");
            
        } else if((defenderHP <= 0) && (defeated != 3)){
            console.log(defeated)
           // $(".card").on("click");
           // $("#attack").on("click");
            defender = false;
            $("#defenderZone").hide();
            $('#msg1').text('Choose your next defender!');
            $('#msg').show();
            
            //$("#attack").off("click");
            console.log("defender <=0")
        } 
    }
    $("#reset").click(function(){
        location.reload();
        
    })
    

});