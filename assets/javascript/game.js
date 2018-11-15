$(document).ready(function(){

    var combatPoints = [{name : 'John Snow',hp:100,ap:25},
                         {name :'Cersei', hp:200,ap:20},{name:'Daenerys',hp:350,ap:25},
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
    var baseAP,getDefenderName,getDefenderImg,getDefenderHp;
    
    for(i=0;i<combatPoints.length;i++){
        var id = "#avatar";
        var child = 1 + i;
        $(id + child).find('p:last').text('HP:' + combatPoints[i].hp);
    }
//    $('#avatar1').find('p:last').text('HP:' + combatPoints[0].hp);
//    $('#avatar2').find('p:last').text('HP:' + combatPoints[1].hp);
//    $('#avatar3').find('p:last').text('HP:' + combatPoints[2].hp);
//    $('#avatar4').find('p:last').text('HP:' + combatPoints[3].hp);
    $('#challengeZone').hide();
    $('#defenderZone').hide();
    $('#attack').hide();
    $('#reset').hide();
    $('#score').hide();
    $('#msg').hide();
    
    $('.main').on('click',".card",function(){
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
            $('#reset').show();
    
            getChallengerpt = getCombatAp(getChallengerName);
            baseAP = getChallengerpt.attackerAp;
        } else  {
            $('.main').hide();
            $('#msg').hide();
            defeated += 1;
           
            console.log("defeated - ",defeated);
            getDefenderId = $(this).attr('id');

            getDefenderName = $(this).find("p:first").text();
            getDefenderImg = $(this).find('img').attr('src');
            getDefenderHp = $(this).find("p:last").text();
            $(this).hide();

            $('#attack').show();
            $("#attack").removeAttr("disabled");
            
            $('#defenderName').text(getDefenderName);
            $('#defenderHp').text(getDefenderHp);
            $('#defenderImg').attr('src',getDefenderImg);
            $('#defenderZone').show();

            getDefenderpt = getCombatAp(getDefenderName);
            
        }
    });
    $('#attack').click(function(){
       
       
        console.log(!challengerAp);
      
            if(getChallengerpt.attackerHp > 0){
                //update challenger HP
                getChallengerpt.attackerHp = getChallengerpt.attackerHp - getDefenderpt.attackerAp;
                $('#challengerHp').text("HP :" +getChallengerpt.attackerHp );
                getDefenderpt.attackerHp = getDefenderpt.attackerHp - getChallengerpt.attackerAp;
                //update defender HP
                $('#defenderHp').text("HP :" +getDefenderpt.attackerHp );
                $('.defendend').text(getDefenderName); $('#yourDamage').text(getChallengerpt.attackerAp);
                $('#defendDamage').text(getDefenderpt.attackerAp);
                
                getChallengerpt.attackerAp = getChallengerpt.attackerAp + baseAP;
                attacks ++;
                $('#score').show();

                checkWinner(getChallengerpt.attackerHp,getDefenderpt.attackerHp)
                
            } 

        
    });
    function getCombatAp(attacker){
        for(i=0;i<combatPoints.length; i++){
                if(combatPoints[i].name == attacker){
                attackerAp = combatPoints[i].ap;              
                attackerHp = combatPoints[i].hp;
                return {attackerAp : attackerAp,attackerHp: attackerHp};

            }
            }
    }
    function checkWinner(challengerHP,defenderHP){
        console.log(challengerHP);
        if (challengerHP <= 0){
            
            $('#msg1').text('You lost the throne!');
            $('#msg').show();
             $('#choice').text('Game Over!!')
            $(".card").off("click");
            $("#attack").off("click");
            
            } else if( (defeated == 3)) {
            $('#msg1').text('You won the throne!');
            $("#msg1").append("<img src='assets/images/throne-of-swords.jpg' width='50px'>");
            $('#msg').show();
            $('#choice').text('Game Over!!').jpg
            $(".card").off("click");
            $("#attack").off("click");
            
        } else if((defenderHP <= 0) && (defeated != 3)){
            
            defender = false;
            $("#defenderZone").hide();
            $('#msg1').text('Choose your next defender!');
            $('.main').show();
            $('#msg').show(); 
            $("#attack").attr("disabled", "disabled");
            
        } 
    }
    $("#reset").click(function(){
        location.reload();
        
    })
    

});