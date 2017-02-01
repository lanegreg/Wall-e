
/**!
 *	Proc Name:		  GetStagedLeadById
 *	Lives In:		    StoneAge
 *  Schema Name:    FCCWeb
 *
 *	Author:			    Greg Lane
 *	Dependents:		  Finance.CAR.com website (FCCWeb)
 *	Last Modified:	08/11/2016
 **/
 

USE [StoneAge]
GO


if NOT exists (
  select * 
  from sys.procedures as p 
  left join sys.schemas as s on p.schema_id = s.schema_id 
  where s.Name = 'FCCWeb'
    and p.name = N'GetStagedLeadById' 
    and p.type in (N'P', N'PC')
)
exec('create proc FCCWeb.GetStagedLeadById as select GetDate();')
GO


alter proc FCCWeb.GetStagedLeadById (
  @Id int = 0
) as
begin

  set nocount on

  -- Dirty reads are OK
  set transaction isolation level read uncommitted


  select
    Id,
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
  from FCCWebStagedLeadApplicant
  where Id = @Id

end 
GO


/*
USE StoneAge
GO

  drop procedure FCCWeb.GetStagedLeadById
  
  exec FCCWeb.GetStagedLeadById @Id=1
  
  select * from FCCWebStagedLeadApplicant
  
  -- truncate table FCCWebStagedLeadApplicant

*/