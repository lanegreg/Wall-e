
/**!
 *	Proc Name:		  UpsertStagedLead
 *	Lives In:		    StoneAge
 *  Schema Name:    FCCWeb
 *
 *	Author:			    Greg Lane
 *	Dependents:		  Finance.CAR.com website (FCCWeb)
 *	Last Modified:	08/01/2016
 **/
 

USE [StoneAge]
GO


if NOT exists (
  select * 
  from sys.procedures as p 
  left join sys.schemas as s on p.schema_id = s.schema_id 
  where s.Name = 'FCCWeb'
    and p.name = N'UpsertStagedLead' 
    and p.type in (N'P', N'PC')
)
exec('create proc FCCWeb.UpsertStagedLead as select GetDate();')
GO


alter proc FCCWeb.UpsertStagedLead (
  @Id int = 0,
  @SessionId varchar(36) = '',
  @CampaignId varchar(20) = '',
  @IpAddress varchar(11) = '',

  @FirstName varchar(50) = '',
  @LastName varchar(50) = '',
  @DateOfBirth varchar(10) = '',
  @SocialSecurity varchar(11) = '',
  @Email varchar(50) = '',
  @HomePhone varchar(14) = '',
  @MobilePhone varchar(14) = '',

  @Address varchar(50) = '',
  @City varchar(50) = '',
  @State varchar(2) = '',
  @Zipcode varchar(5) = '',

  @GrossMonthlyIncome varchar(15) = '',
  @CreditRatingId int = 0,
  @ResidenceTimeInMos int = 0,
  @ResidenceTypeId int = 0,
  @ResidenceCostInMos int = 0,

  @Employer varchar(50) = '',
  @EmploymentTimeInMos int = 0,
  @JobTitle varchar(50) = '',
  @WorkPhone varchar(14) = '',

  @PrivacyPolicyIsAccepted tinyint = 0,
  @CreditAuthorizationIsApproved tinyint = 0,
  @ForwardApplicationIsApproved tinyint = 0,
  @CreditEvalOfferIsAccepted tinyint = 0,
  @TcpaAllowUsToContactIsAccepted tinyint = 0,

  @SuccessfulPlacementCheck tinyint = 0,
  @SuccessfulLeadSubmission tinyint = 0,

  @ReturnVal int output
) as
begin
  set nocount on

  set @returnVal = @Id

  if(@Id = 0)
  begin
    declare @Ids table (Id int)

    insert FCCWebStagedLeadApplicant (
      SessionId,
      CampaignId,
      IpAddress,

      FirstName,
      LastName,
      DateOfBirth,
      SocialSecurity,
      Email,
      HomePhone,
      MobilePhone,
      
      Address,
      City,
      State,
      Zipcode,

      GrossMonthlyIncome,
      CreditRatingId,
      ResidenceTimeInMos,
      ResidenceTypeId,
      ResidenceCostInMos,

      Employer,
      EmploymentTimeInMos,
      JobTitle,
      WorkPhone,

      PrivacyPolicyIsAccepted,
      CreditAuthorizationIsApproved,
      ForwardApplicationIsApproved,
      CreditEvalOfferIsAccepted,
      TcpaAllowUsToContactIsAccepted,

      SuccessfulPlacementCheck,
      SuccessfulLeadSubmission
    )
    output Inserted.Id into @Ids
    values (
      @SessionId,
      @CampaignId,
      @IpAddress,

      @FirstName,
      @LastName,
      @DateOfBirth,
      @SocialSecurity,
      @Email,
      @HomePhone,
      @MobilePhone,

      @Address,
      @City,
      @State,
      @Zipcode,
      
      @GrossMonthlyIncome,
      @CreditRatingId,
      @ResidenceTimeInMos,
      @ResidenceTypeId,
      @ResidenceCostInMos,

      @Employer,
      @EmploymentTimeInMos,
      @JobTitle,
      @WorkPhone,

      @PrivacyPolicyIsAccepted,
      @CreditAuthorizationIsApproved,
      @ForwardApplicationIsApproved,
      @CreditEvalOfferIsAccepted,
      @TcpaAllowUsToContactIsAccepted,

      @SuccessfulPlacementCheck,
      @SuccessfulLeadSubmission
    )

    select @ReturnVal = Id from @Ids
  end else begin
    update FCCWebStagedLeadApplicant
    set 
        SessionId                       = @SessionId,
        CampaignId                      = @CampaignId,
        IpAddress                       = @IpAddress,

        FirstName                       = @FirstName,
        LastName                        = @LastName,
        DateOfBirth                     = @DateOfBirth,
        SocialSecurity                  = @SocialSecurity,
        Email                           = @Email,
        HomePhone                       = @HomePhone,
        MobilePhone                     = @MobilePhone,

        Address                         = @Address,
        City                            = @City,
        State                           = @State,
        Zipcode                         = @Zipcode,

        GrossMonthlyIncome              = @GrossMonthlyIncome,
        CreditRatingId                  = @CreditRatingId,
        ResidenceTimeInMos              = @ResidenceTimeInMos,
        ResidenceTypeId                 = @ResidenceTypeId,
        ResidenceCostInMos              = @ResidenceCostInMos,

        Employer                        = @Employer,
        EmploymentTimeInMos             = @EmploymentTimeInMos,
        JobTitle                        = @JobTitle,
        WorkPhone                       = @WorkPhone,

        PrivacyPolicyIsAccepted         = @PrivacyPolicyIsAccepted,
        CreditAuthorizationIsApproved   = @CreditAuthorizationIsApproved,
        ForwardApplicationIsApproved    = @ForwardApplicationIsApproved,
        CreditEvalOfferIsAccepted       = @CreditEvalOfferIsAccepted,
        TcpaAllowUsToContactIsAccepted  = @TcpaAllowUsToContactIsAccepted,

        SuccessfulPlacementCheck        = @SuccessfulPlacementCheck,
        SuccessfulLeadSubmission        = @SuccessfulLeadSubmission
    where Id = @Id
  end
end 
GO


/*
USE Finance
GO

  drop procedure FCCWeb.UpsertStagedLead
  
  exec FCCWeb.UpsertStagedLead -- Not using @Id
    @FirstName='Jack', @LastName='Thumb', 
    @Email='jt@giant.io', @Phone='7142345986', 
    @Address='Jolly St.', @City='Green Valley', @State='NC', @Zipcode='34756',
    @MonthlyIncome='5000', @AnnualIncome='60000', @SelfCreditRating='3',
    @MonthsAtResidence='14', @ResidenceType='3', @ResidenceMonthlyPayment='2100',
    @EmployerName='Bob''s Big Boy', @JobTitle='Head Manager Dude',
    @DateOfBirth='07231983', @SocialSecurity='987453218'


  exec FCCWeb.UpsertStagedLead @Id=1,
    @FirstName='Jacklynn', @LastName='Thumb', 
    @Email='jt@giant.io', @Phone='7142345986', 
    @Address='Jolly St.', @City='Green Valley', @State='NC', @Zipcode='34756',
    @MonthlyIncome='5000', @AnnualIncome='60000', @SelfCreditRating='3',
    @MonthsAtResidence='14', @ResidenceType='3', @ResidenceMonthlyPayment='2100',
    @EmployerName='Bob''s Big Boy', @JobTitle='Head Manager Dude',
    @DateOfBirth='07231983', @SocialSecurity='987453218'
    
  
  select * from FCCWebStagedLeadApplicant
  
  -- truncate table FCCWebStagedLeadApplicant

*/