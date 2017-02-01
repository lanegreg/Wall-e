/**!
 *	Author:			    Greg Lane
 *	Lives In:		    StoneAge
 *	Dependents:		  Finance.CAR.com website (FCCWeb)
 *	Last Modified:	07/29/2016
 **/
 

 
USE [StoneAge]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[FCCWebStagedLeadApplicant](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[SessionId] [varchar](36) NOT NULL,
	[CampaignId] [varchar](20) NOT NULL,
	[IpAddress] [varchar](11) NOT NULL,

	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[DateOfBirth] [varchar](10) NOT NULL,
	[SocialSecurity] [varchar](11) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[HomePhone] [varchar](14) NOT NULL,
	[MobilePhone] [varchar](14) NOT NULL,

	[Address] [varchar](50) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[State] [varchar](2) NOT NULL,
	[Zipcode] [varchar](5) NOT NULL,

	[GrossMonthlyIncome] [varchar](15) NOT NULL,
	[CreditRatingId] [int] NOT NULL,
	[ResidenceTimeInMos] [varchar](4) NOT NULL,
	[ResidenceTypeId] [int] NOT NULL,
	[ResidenceCostInMos] [int] NOT NULL,

	[Employer] [varchar](50) NOT NULL,
	[EmploymentTimeInMos] [int] NOT NULL,
	[JobTitle] [varchar](50) NOT NULL,
	[WorkPhone] [varchar](14) NOT NULL,

	[PrivacyPolicyIsAccepted] [tinyint] NOT NULL,
	[CreditAuthorizationIsApproved] [tinyint] NOT NULL,
	[ForwardApplicationIsApproved] [tinyint] NOT NULL,
	[CreditEvalOfferIsAccepted] [tinyint] NOT NULL,
	[TcpaAllowUsToContactIsAccepted] [tinyint] NOT NULL,

	[SuccessfulPlacementCheck] [tinyint] NOT NULL,
	[SuccessfulLeadSubmission] [tinyint] NOT NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_FirstName]  DEFAULT ('') FOR [FirstName]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_LastName]  DEFAULT ('') FOR [LastName]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_Email]  DEFAULT ('') FOR [Email]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_HomePhone]  DEFAULT ('') FOR [HomePhone]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_MobilePhone]  DEFAULT ('') FOR [MobilePhone]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_WorkPhone]  DEFAULT ('') FOR [WorkPhone]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_Address]  DEFAULT ('') FOR [Address]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_City]  DEFAULT ('') FOR [City]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_State]  DEFAULT ('') FOR [State]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_Zipcode]  DEFAULT ('') FOR [Zipcode]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_GrossMonthlyIncome]  DEFAULT (0) FOR [GrossMonthlyIncome]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_CreditRatingId]  DEFAULT (0) FOR [CreditRatingId]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_ResidenceTimeInMos]  DEFAULT (0) FOR [ResidenceTimeInMos]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_ResidenceTypeId]  DEFAULT (0) FOR [ResidenceTypeId]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_ResidenceCostInMos]  DEFAULT (0) FOR [ResidenceCostInMos]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_Employer]  DEFAULT ('') FOR [Employer]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_EmploymentTimeInMos]  DEFAULT (0) FOR [EmploymentTimeInMos]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_JobTitle]  DEFAULT ('') FOR [JobTitle]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_DateOfBirth]  DEFAULT ('') FOR [DateOfBirth]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_SocialSecurity]  DEFAULT ('') FOR [SocialSecurity]
GO


ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_SessionId]  DEFAULT ('') FOR [SessionId]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_CampaignId]  DEFAULT ('') FOR [CampaignId]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_IpAddress]  DEFAULT ('') FOR [IpAddress]
GO


ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_PrivacyPolicyIsAccepted]  DEFAULT (0) FOR [PrivacyPolicyIsAccepted]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_CreditAuthorizationIsApproved]  DEFAULT (0) FOR [CreditAuthorizationIsApproved]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_ForwardApplicationIsApproved]  DEFAULT (0) FOR [ForwardApplicationIsApproved]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_CreditEvalOfferIsAccepted]  DEFAULT (0) FOR [CreditEvalOfferIsAccepted]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_TcpaAllowUsToContactIsAccepted]  DEFAULT (0) FOR [TcpaAllowUsToContactIsAccepted]
GO


ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_SuccessfulPlacementCheck]  DEFAULT (0) FOR [SuccessfulPlacementCheck]
GO

ALTER TABLE [dbo].[FCCWebStagedLeadApplicant] ADD  CONSTRAINT [DF_FCCWebStagedLeadApplicant_SuccessfulLeadSubmission]  DEFAULT (0) FOR [SuccessfulLeadSubmission]
GO



/*

-- drop table FCCWebStagedLeadApplicant

*/